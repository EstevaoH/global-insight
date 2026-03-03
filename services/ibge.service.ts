/**
 * IBGE Service — Global Insight
 *
 * Adaptador para a API IBGE Países.
 * Documentação: https://servicodados.ibge.gov.br/api/docs/paises
 *
 * Endpoints utilizados:
 *   GET /api/v1/paises/{paises}
 *     → Perfil de um ou mais países (separados por "|")
 *
 *   GET /api/v1/paises/indicadores/{indicadores}
 *     → Lista de indicadores disponíveis (sem séries)
 *
 *   GET /api/v1/paises/{paises}/indicadores/{indicadores}
 *     → Séries temporais de indicadores para países específicos
 *
 * Identificadores aceitos:
 *   - ISO 3166-1 Alpha-2 (ex: "BR", "US")
 *   - ISO 3166-1 Alpha-3 (ex: "BRA", "USA")
 *   - M49 numérico (ex: "076", "840")
 *
 * Múltiplos valores são separados por "|" na URL.
 */

import { IbgeCountry, Country } from '@/types/country.types';
import { IbgeIndicator, ProcessedIndicatorSeries, DataPoint, RawSerie } from '@/types/indicator.types';
import { cacheService } from './cache.service';

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/paises';

/** TTL para dados de país (raramente mudam) — 30 min */
const TTL_COUNTRY = 30 * 60 * 1000;
/** TTL para séries de indicadores — 10 min */
const TTL_INDICATOR = 10 * 60 * 1000;

// ── Helpers internos ─────────────────────────────────────────────────────────

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`IBGE API error ${res.status}: ${url}`);
    }
    return res.json() as Promise<T>;
}

/**
 * Converte um array de objetos `{ "ano": "valor" }` em pontos (year, value).
 * Ignora períodos multi-anuais (ex: "2010-2015") e valores nulos.
 */
function extractYearlyDataPoints(serie: RawSerie[]): DataPoint[] {
    const points: DataPoint[] = [];
    if (!Array.isArray(serie)) return points;
    for (const entry of serie) {
        if (!entry || typeof entry !== 'object') continue;
        const pair = Object.entries(entry)[0];
        if (!pair) continue;
        const [period, raw] = pair;
        // Aceita apenas anos de 4 dígitos
        if (!/^\d{4}$/.test(period)) continue;
        if (raw === null || raw === undefined) continue;
        const value = parseFloat(raw);
        if (isNaN(value)) continue;
        points.push({ year: parseInt(period, 10), value });
    }
    return points.sort((a, b) => a.year - b.year);
}

/** Mapeia IbgeCountry → Country (formato simplificado para a UI). */
function mapCountry(raw: IbgeCountry): Country {
    return {
        code: raw.id['ISO-3166-1-ALPHA-2'],
        code3: raw.id['ISO-3166-1-ALPHA-3'],
        m49: raw.id.M49,
        name: raw.nome.abreviado,
        nameEN: raw.nome['abreviado-EN'],
        region: raw.localizacao.regiao.nome,
        subRegion: raw.localizacao['sub-regiao'].nome,
        capital: raw.governo?.capital?.nome ?? '',
        areaTotalKm2: parseFloat(raw.area?.total?.replace(',', '.') ?? '0'),
        languages: raw.linguas?.map((l) => l.nome) ?? [],
        currencies: raw['unidades-monetarias']?.map((c) => c.nome) ?? [],
        history: raw.historico,
    };
}

// ── API pública do serviço ────────────────────────────────────────────────────

/**
 * Busca o perfil de um ou mais países.
 *
 * @param codes - Um ou mais códigos ISO Alpha-2 (ex: "BR" ou ["BR","US","DE"])
 * @returns Array de Country normalizados
 *
 * @example
 * const countries = await ibgeService.getCountries(["BR", "US", "DE"]);
 */
async function getCountries(codes: string | string[]): Promise<Country[]> {
    const list = Array.isArray(codes) ? codes : [codes];
    const joined = list.map((c) => c.toUpperCase()).join('|');
    const cacheKey = `country:${joined}`;

    const cached = cacheService.get<Country[]>(cacheKey);
    if (cached) return cached;

    const raw = await fetchJson<IbgeCountry[]>(`${BASE_URL}/${encodeURIComponent(joined)}`);
    const result = raw.map(mapCountry);
    cacheService.set(cacheKey, result, TTL_COUNTRY);
    return result;
}

/**
 * Busca o perfil de todos os países (sem filtro).
 * Use com moderação — retorna muitos registros.
 */
async function getAllCountries(): Promise<Country[]> {
    return getCountries('all');
}

/**
 * Busca os metadados dos indicadores disponíveis (sem séries).
 *
 * @param indicatorIds - IDs dos indicadores (ex: [77818, 77819])
 */
async function getIndicatorsMeta(indicatorIds: number[]): Promise<IbgeIndicator[]> {
    const joined = indicatorIds.join('|');
    const cacheKey = `indicators-meta:${joined}`;

    const cached = cacheService.get<IbgeIndicator[]>(cacheKey);
    if (cached) return cached;

    const raw = await fetchJson<IbgeIndicator[]>(
        `${BASE_URL}/indicadores/${encodeURIComponent(joined)}`
    );
    cacheService.set(cacheKey, raw, TTL_INDICATOR);
    return raw;
}

/**
 * Busca séries temporais de indicadores para países específicos.
 *
 * @param countryCodes - Códigos ISO Alpha-2 (ex: ["BR","US"])
 * @param indicatorIds - IDs dos indicadores (ex: [77819, 77820])
 * @returns Séries processadas prontas para renderização em gráficos
 *
 * @example
 * const series = await ibgeService.getIndicatorSeries(
 *   ["BR", "US", "DE"],
 *   [77819, 77820]
 * );
 */
async function getIndicatorSeries(
    countryCodes: string[],
    indicatorIds: number[]
): Promise<ProcessedIndicatorSeries[]> {
    const countriesJoined = countryCodes.map((c) => c.toUpperCase()).join('|');
    const indicatorsJoined = indicatorIds.join('|');
    const cacheKey = `indicator-series:${countriesJoined}:${indicatorsJoined}`;

    const cached = cacheService.get<ProcessedIndicatorSeries[]>(cacheKey);
    if (cached) return cached;

    const raw = await fetchJson<IbgeIndicator[]>(
        `${BASE_URL}/${encodeURIComponent(countriesJoined)}/indicadores/${encodeURIComponent(indicatorsJoined)}`
    );

    const result: ProcessedIndicatorSeries[] = [];

    for (const indicator of raw) {
        if (!indicator || !indicator.series) continue;
        for (const s of indicator.series) {
            // Alguns indicadores retornam entradas sem 'pais' — ignorar
            if (!s || !s.pais || !s.pais.id) continue;
            result.push({
                countryCode: s.pais.id,
                countryName: s.pais.nome ?? s.pais.id,
                indicatorId: indicator.id,
                indicatorName: indicator.indicador,
                unit: indicator.unidade?.id ?? '',
                multiplier: indicator.unidade?.multiplicador ?? 1,
                data: extractYearlyDataPoints(s.serie ?? []),
            });
        }
    }

    cacheService.set(cacheKey, result, TTL_INDICATOR);
    return result;
}

export const ibgeService = {
    getCountries,
    getAllCountries,
    getIndicatorsMeta,
    getIndicatorSeries,
};
