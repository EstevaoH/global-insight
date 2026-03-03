'use client';

/**
 * useIndicators — Global Insight
 *
 * Hook de dados para séries temporais de indicadores via IBGE.
 *
 * @example
 * const { series, isLoading } = useIndicators(["BR","US"], [77819, 77820]);
 */

import useSWR from 'swr';
import { ProcessedIndicatorSeries } from '@/types/indicator.types';
import { ibgeService } from '@/services/ibge.service';

interface UseIndicatorsResult {
    series: ProcessedIndicatorSeries[];
    isLoading: boolean;
    error: Error | null;
}

/**
 * @param countryCodes  - Códigos ISO Alpha-2 (ex: ["BR", "US"])
 * @param indicatorIds  - IDs dos indicadores IBGE (ex: [77819, 77820])
 */
export function useIndicators(
    countryCodes: string[],
    indicatorIds: number[]
): UseIndicatorsResult {
    const enabledKey =
        countryCodes.length > 0 && indicatorIds.length > 0
            ? `indicators:${countryCodes.join('|')}:${indicatorIds.join('|')}`
            : null;

    const { data, error, isLoading } = useSWR<ProcessedIndicatorSeries[]>(
        enabledKey,
        () => ibgeService.getIndicatorSeries(countryCodes, indicatorIds),
        { revalidateOnFocus: false }
    );

    return {
        series: data ?? [],
        isLoading,
        error: error ?? null,
    };
}

/**
 * Filtra as séries retornadas pelo hook para um indicador específico.
 *
 * @example
 * const educationSeries = filterByIndicator(series, 77819);
 */
export function filterByIndicator(
    series: ProcessedIndicatorSeries[],
    indicatorId: number
): ProcessedIndicatorSeries[] {
    return series.filter((s) => s.indicatorId === indicatorId);
}

/**
 * Filtra as séries retornadas pelo hook para um país específico.
 *
 * @example
 * const brSeries = filterByCountry(series, "BR");
 */
export function filterByCountry(
    series: ProcessedIndicatorSeries[],
    countryCode: string
): ProcessedIndicatorSeries[] {
    return series.filter((s) => s.countryCode === countryCode.toUpperCase());
}
