'use client';

/**
 * useCountries — Global Insight
 *
 * Hook de dados para perfil de países via IBGE.
 * Usa SWR para cache, revalidação e loading state.
 *
 * @example
 * const { countries, isLoading, error } = useCountries(["BR", "US", "DE"]);
 */

import useSWR from 'swr';
import { Country } from '@/types/country.types';
import { ibgeService } from '@/services/ibge.service';

interface UseCountriesResult {
    countries: Country[];
    isLoading: boolean;
    error: Error | null;
}

/**
 * @param codes - Código(s) ISO Alpha-2. Passe "all" para todos os países.
 */
export function useCountries(codes: string | string[]): UseCountriesResult {
    const key = Array.isArray(codes) ? codes.join('|') : codes;

    const { data, error, isLoading } = useSWR<Country[]>(
        key ? `countries:${key}` : null,
        () => ibgeService.getCountries(codes),
        { revalidateOnFocus: false }
    );

    return {
        countries: data ?? [],
        isLoading,
        error: error ?? null,
    };
}

/**
 * Busca um único país.
 *
 * @example
 * const { country, isLoading } = useCountry("BR");
 */
export function useCountry(code: string): { country: Country | null; isLoading: boolean; error: Error | null } {
    const { countries, isLoading, error } = useCountries([code]);
    return { country: countries[0] ?? null, isLoading, error };
}
