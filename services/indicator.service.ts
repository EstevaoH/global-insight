/**
 * Indicator Service — Global Insight
 *
 * Camada de lógica sobre o ibgeService para operações de análise
 * (cálculo de crescimento, tendência, diferença, ranking).
 */

import { ibgeService } from './ibge.service';
import { ProcessedIndicatorSeries, DataPoint } from '@/types/indicator.types';

/** Retorna o valor de um determinado ano (ou null se não encontrado). */
export function getValueByYear(series: ProcessedIndicatorSeries, year: number): number | null {
    const point = series.data.find((d) => d.year === year);
    return point ? point.value : null;
}

/** Retorna o ponto mais recente da série. */
export function getLatestDataPoint(series: ProcessedIndicatorSeries): DataPoint | null {
    if (series.data.length === 0) return null;
    return series.data[series.data.length - 1];
}

/**
 * Calcula o crescimento percentual entre dois anos.
 * @returns Percentual (ex: 18.5 = 18,5%) ou null se dados insuficientes.
 */
export function calcPercentGrowth(
    series: ProcessedIndicatorSeries,
    fromYear: number,
    toYear: number
): number | null {
    const from = getValueByYear(series, fromYear);
    const to = getValueByYear(series, toYear);
    if (from === null || to === null || from === 0) return null;
    return ((to - from) / Math.abs(from)) * 100;
}

/**
 * Gera um insight textual comparando dois países em um indicador.
 * Ex: "Entre 2010 e 2020, o Brasil cresceu 18% acima da Argentina."
 */
export function generateComparisonInsight(
    a: ProcessedIndicatorSeries,
    b: ProcessedIndicatorSeries,
    fromYear: number,
    toYear: number
): string {
    const growthA = calcPercentGrowth(a, fromYear, toYear);
    const growthB = calcPercentGrowth(b, fromYear, toYear);

    if (growthA === null || growthB === null) {
        return `Dados insuficientes para comparar ${a.countryName} e ${b.countryName} entre ${fromYear} e ${toYear}.`;
    }

    const diff = Math.abs(growthA - growthB).toFixed(1);
    const leader = growthA > growthB ? a.countryName : b.countryName;
    const trailer = growthA > growthB ? b.countryName : a.countryName;

    return `Entre ${fromYear} e ${toYear}, ${leader} apresentou crescimento ${diff}% superior ao de ${trailer} no indicador "${a.indicatorName}".`;
}

/**
 * Ordena um conjunto de séries (um por país) pelo valor do último ano,
 * para uso no Módulo de Ranking.
 */
export function rankSeriesByLatestValue(
    series: ProcessedIndicatorSeries[],
    order: 'asc' | 'desc' = 'desc'
): ProcessedIndicatorSeries[] {
    return [...series].sort((a, b) => {
        const va = getLatestDataPoint(a)?.value ?? -Infinity;
        const vb = getLatestDataPoint(b)?.value ?? -Infinity;
        return order === 'desc' ? vb - va : va - vb;
    });
}

/**
 * Busca séries de múltiplos países e indicadores e as processa.
 * Wrapper de conveniência que combina ibgeService + lógica local.
 */
export async function fetchAndRankIndicator(
    countryCodes: string[],
    indicatorId: number,
    order: 'asc' | 'desc' = 'desc'
): Promise<ProcessedIndicatorSeries[]> {
    const all = await ibgeService.getIndicatorSeries(countryCodes, [indicatorId]);
    return rankSeriesByLatestValue(all, order);
}
