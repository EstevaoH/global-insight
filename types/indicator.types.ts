/**
 * Tipos para Indicadores — API IBGE Países
 * Referência: https://servicodados.ibge.gov.br/api/docs/paises
 *
 * Endpoints:
 *   GET /api/v1/paises/indicadores/{indicadores}
 *   GET /api/v1/paises/{paises}/indicadores/{indicadores}
 */

/** Unidade de medida de um indicador */
export interface IndicatorUnit {
    /** Ex: "% do PIB", "turistas", "hab." */
    id: string;
    /** "N" = numérico, "C" = caractere */
    classe: 'N' | 'C';
    /** Multiplicador para o valor (ex: 1000 para valores em milhares) */
    multiplicador: number;
}

/** Referência ao país dentro de uma série */
export interface IndicatorCountryRef {
    /** Código ISO 3166-1 Alpha-2 */
    id: string;
    nome: string;
}

/**
 * Cada entrada da série como retornada pela API.
 * A chave é o período (ex: "2020", "2010-2015"), o valor é string numérica ou null.
 */
export type RawSerie = Record<string, string | null>;

/** Série histórica de um indicador para um país específico */
export interface IndicatorSeries {
    pais: IndicatorCountryRef;
    serie: RawSerie[];
}

/**
 * Indicador retornado pela API, com séries opcionais.
 */
export interface IbgeIndicator {
    id: number;
    indicador: string;
    unidade: IndicatorUnit;
    series?: IndicatorSeries[];
}

// ── Versões processadas para uso na UI ──────────────────────────────────────

/** Ponto de dado normalizado (período + valor numérico) */
export interface DataPoint {
    /** Período anual (ex: 2020). Períodos multi-anuais são ignorados. */
    year: number;
    value: number;
}

/** Série temporal processada de um indicador para um país */
export interface ProcessedIndicatorSeries {
    countryCode: string;
    countryName: string;
    indicatorId: number;
    indicatorName: string;
    unit: string;
    multiplier: number;
    /** Dados filtrados: apenas anos inteiros com valor não-nulo, ordenados */
    data: DataPoint[];
}

// ── Categorias de indicadores ────────────────────────────────────────────────

export type IndicatorCategory =
    | 'Economia'
    | 'Indicadores Sociais'
    | 'Meio Ambiente'
    | 'População'
    | 'Redes'
    | 'Saúde';

/** IDs de todos os indicadores disponíveis na API IBGE Países */
export const INDICATOR_IDS = {
    // Economia
    TOURISM_ARRIVALS: 77818,
    EDUCATION_SPENDING: 77819,
    HEALTH_SPENDING: 77820,
    RD_INVESTMENT: 77821,
    ECONOMICALLY_ACTIVE_WOMEN: 77822,
    GDP_PER_CAPITA: 77823,
    ECONOMICALLY_ACTIVE_POP: 77824,
    TOTAL_EXPORTS: 77825,
    TOTAL_IMPORTS: 77826,
    TOTAL_GDP: 77827,
    // Indicadores Sociais
    LIFE_EXPECTANCY: 77830,
    HDI: 77831,
    ACCESS_DRINKING_WATER: 77832,
    ACCESS_SANITATION: 77833,
    GROSS_ENROLLMENT_RATE: 77835,
    LITERACY_RATE: 77836,
    // Meio Ambiente
    CULTIVATED_AREAS: 77838,
    PERMANENT_PASTURE_AREAS: 77839,
    PROTECTED_AREAS: 77840,
    NATURAL_GAS_PRODUCTION: 77841,
    OIL_PRODUCTION: 77842,
    // População
    POPULATION_DENSITY: 77844,
    MALE_POPULATION: 77845,
    FEMALE_POPULATION: 77846,
    RURAL_POPULATION: 77847,
    URBAN_POPULATION: 77848,
    TOTAL_POPULATION: 77849,
    CRUDE_DEATH_RATE: 77850,
    CRUDE_BIRTH_RATE: 77851,
    ANNUAL_POPULATION_GROWTH: 77852,
    // Redes
    MOBILE_SUBSCRIPTIONS: 77854,
    FIXED_SUBSCRIPTIONS: 77855,
    INTERNET_ACCESS: 77857,
    // Saúde
    CALORIC_CONSUMPTION: 77829,
    UNDERNOURISHMENT: 77834,
} as const;

export type IndicatorId = (typeof INDICATOR_IDS)[keyof typeof INDICATOR_IDS];

/** Metadado descritivo de cada indicador para exibição na UI */
export interface IndicatorMeta {
    id: IndicatorId;
    label: string;
    unit: string;
    description: string;
    category: IndicatorCategory;
}

export const INDICATORS_META: IndicatorMeta[] = [
    // ── Economia ────────────────────────────────────────────────────────────
    {
        id: INDICATOR_IDS.TOURISM_ARRIVALS,
        label: 'Chegada de turistas',
        unit: 'turistas',
        description: 'Número de turistas internacionais que chegaram ao país no período.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.EDUCATION_SPENDING,
        label: 'Gastos públicos com educação',
        unit: '% do PIB',
        description: 'Gastos públicos com educação como percentual do PIB.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.HEALTH_SPENDING,
        label: 'Gastos públicos com saúde',
        unit: '% do PIB',
        description: 'Gastos públicos com saúde como percentual do PIB.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.RD_INVESTMENT,
        label: 'Investimentos em P&D',
        unit: '% do PIB',
        description: 'Investimentos em pesquisa e desenvolvimento como percentual do PIB.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.ECONOMICALLY_ACTIVE_WOMEN,
        label: 'Mulheres economicamente ativas',
        unit: 'pessoas',
        description: 'Mulheres de 15 anos ou mais de idade economicamente ativas.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.GDP_PER_CAPITA,
        label: 'PIB per capita',
        unit: 'US$',
        description: 'Produto Interno Bruto dividido pela população total.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.ECONOMICALLY_ACTIVE_POP,
        label: 'População economicamente ativa',
        unit: 'pessoas',
        description: 'População de 15 anos ou mais de idade economicamente ativa.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.TOTAL_EXPORTS,
        label: 'Total de exportações',
        unit: 'US$',
        description: 'Valor total das exportações do país.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.TOTAL_IMPORTS,
        label: 'Total de importações',
        unit: 'US$',
        description: 'Valor total das importações do país.',
        category: 'Economia',
    },
    {
        id: INDICATOR_IDS.TOTAL_GDP,
        label: 'PIB total',
        unit: 'US$',
        description: 'Produto Interno Bruto total do país.',
        category: 'Economia',
    },

    // ── Indicadores Sociais ─────────────────────────────────────────────────
    {
        id: INDICATOR_IDS.LIFE_EXPECTANCY,
        label: 'Esperança de vida ao nascer',
        unit: 'anos',
        description: 'Número médio de anos que um recém-nascido deve viver.',
        category: 'Indicadores Sociais',
    },
    {
        id: INDICATOR_IDS.HDI,
        label: 'Índice de Desenvolvimento Humano',
        unit: 'IDH',
        description: 'Medida composta de desenvolvimento humano (0 a 1).',
        category: 'Indicadores Sociais',
    },
    {
        id: INDICATOR_IDS.ACCESS_DRINKING_WATER,
        label: 'Acesso à água potável',
        unit: '% da pop.',
        description: 'Percentual da população com acesso à água potável.',
        category: 'Indicadores Sociais',
    },
    {
        id: INDICATOR_IDS.ACCESS_SANITATION,
        label: 'Acesso à rede sanitária',
        unit: '% da pop.',
        description: 'Percentual da população com acesso à rede de saneamento básico.',
        category: 'Indicadores Sociais',
    },
    {
        id: INDICATOR_IDS.GROSS_ENROLLMENT_RATE,
        label: 'Taxa bruta de matrículas',
        unit: '%',
        description: 'Taxa bruta de matrículas para todos os níveis de ensino.',
        category: 'Indicadores Sociais',
    },
    {
        id: INDICATOR_IDS.LITERACY_RATE,
        label: 'Taxa de alfabetização',
        unit: '%',
        description: 'Taxa de alfabetização de pessoas com 15 anos ou mais de idade.',
        category: 'Indicadores Sociais',
    },

    // ── Meio Ambiente ───────────────────────────────────────────────────────
    {
        id: INDICATOR_IDS.CULTIVATED_AREAS,
        label: 'Áreas cultivadas',
        unit: 'km²',
        description: 'Extensão total de áreas utilizadas para cultivo agrícola.',
        category: 'Meio Ambiente',
    },
    {
        id: INDICATOR_IDS.PERMANENT_PASTURE_AREAS,
        label: 'Áreas de pastagens permanentes',
        unit: 'km²',
        description: 'Extensão de áreas com pastagens permanentes.',
        category: 'Meio Ambiente',
    },
    {
        id: INDICATOR_IDS.PROTECTED_AREAS,
        label: 'Áreas protegidas',
        unit: '% do território',
        description: 'Percentual do território nacional sob proteção ambiental.',
        category: 'Meio Ambiente',
    },
    {
        id: INDICATOR_IDS.NATURAL_GAS_PRODUCTION,
        label: 'Produção de gás natural',
        unit: 'm³',
        description: 'Volume total de gás natural produzido no país.',
        category: 'Meio Ambiente',
    },
    {
        id: INDICATOR_IDS.OIL_PRODUCTION,
        label: 'Produção de petróleo',
        unit: 'barris',
        description: 'Volume total de petróleo produzido no país.',
        category: 'Meio Ambiente',
    },

    // ── População ───────────────────────────────────────────────────────────
    {
        id: INDICATOR_IDS.POPULATION_DENSITY,
        label: 'Densidade demográfica',
        unit: 'hab./km²',
        description: 'Número de habitantes por quilômetro quadrado.',
        category: 'População',
    },
    {
        id: INDICATOR_IDS.MALE_POPULATION,
        label: 'Homens',
        unit: 'pessoas',
        description: 'Total da população masculina.',
        category: 'População',
    },
    {
        id: INDICATOR_IDS.FEMALE_POPULATION,
        label: 'Mulheres',
        unit: 'pessoas',
        description: 'Total da população feminina.',
        category: 'População',
    },
    {
        id: INDICATOR_IDS.RURAL_POPULATION,
        label: 'População rural',
        unit: 'pessoas',
        description: 'Total de habitantes residentes em área rural.',
        category: 'População',
    },
    {
        id: INDICATOR_IDS.URBAN_POPULATION,
        label: 'População urbana',
        unit: 'pessoas',
        description: 'Total de habitantes residentes em área urbana.',
        category: 'População',
    },
    {
        id: INDICATOR_IDS.TOTAL_POPULATION,
        label: 'População total',
        unit: 'pessoas',
        description: 'Total de habitantes residentes no país.',
        category: 'População',
    },
    {
        id: INDICATOR_IDS.CRUDE_DEATH_RATE,
        label: 'Taxa bruta de mortalidade',
        unit: 'por mil hab.',
        description: 'Número de mortes por mil habitantes no período.',
        category: 'População',
    },
    {
        id: INDICATOR_IDS.CRUDE_BIRTH_RATE,
        label: 'Taxa bruta de natalidade',
        unit: 'por mil hab.',
        description: 'Número de nascimentos por mil habitantes no período.',
        category: 'População',
    },
    {
        id: INDICATOR_IDS.ANNUAL_POPULATION_GROWTH,
        label: 'Crescimento anual da população',
        unit: '%',
        description: 'Taxa média anual de crescimento da população.',
        category: 'População',
    },

    // ── Redes ────────────────────────────────────────────────────────────
    {
        id: INDICATOR_IDS.MOBILE_SUBSCRIPTIONS,
        label: 'Assinaturas de telefonia celular',
        unit: 'assinaturas',
        description: 'Total de assinaturas ativas de telefonia celular.',
        category: 'Redes',
    },
    {
        id: INDICATOR_IDS.FIXED_SUBSCRIPTIONS,
        label: 'Assinaturas de telefonia fixa',
        unit: 'assinaturas',
        description: 'Total de assinaturas ativas de telefonia fixa.',
        category: 'Redes',
    },
    {
        id: INDICATOR_IDS.INTERNET_ACCESS,
        label: 'Acesso à internet',
        unit: '% da pop.',
        description: 'Percentual de indivíduos com acesso à internet.',
        category: 'Redes',
    },

    // ── Saúde ────────────────────────────────────────────────────────────
    {
        id: INDICATOR_IDS.CALORIC_CONSUMPTION,
        label: 'Consumo calórico',
        unit: 'kcal/dia',
        description: 'Consumo calórico médio diário por pessoa.',
        category: 'Saúde',
    },
    {
        id: INDICATOR_IDS.UNDERNOURISHMENT,
        label: 'Incidência de subnutrição',
        unit: '% da pop.',
        description: 'Percentual da população com incidência de subnutrição.',
        category: 'Saúde',
    },
];

/** Agrupa INDICATORS_META por categoria */
export function getIndicatorsByCategory(): Record<IndicatorCategory, IndicatorMeta[]> {
    return INDICATORS_META.reduce(
        (acc, meta) => {
            if (!acc[meta.category]) acc[meta.category] = [];
            acc[meta.category].push(meta);
            return acc;
        },
        {} as Record<IndicatorCategory, IndicatorMeta[]>
    );
}

/** Retorna todos os IDs numéricos de um array de IndicatorMeta */
export function metaToIds(metas: IndicatorMeta[]): number[] {
    return metas.map((m) => m.id);
}

/** Todos os IDs de indicadores disponíveis */
export const ALL_INDICATOR_IDS: number[] = Object.values(INDICATOR_IDS);
