'use client';

import { useState } from 'react';
import { useIndicators } from '@/hooks/useIndicators';
import { getIndicatorsByCategory, ALL_INDICATOR_IDS, IndicatorCategory } from '@/types/indicator.types';
import { LineChart } from '@/components/charts/LineChart';
import { Spinner } from '@/components/ui/Spinner';

interface CountryIndicatorsProps {
    countryCode: string;
}

const CATEGORY_ICONS: Record<IndicatorCategory, string> = {
    'Economia': '💹',
    'Indicadores Sociais': '🏥',
    'Meio Ambiente': '🌿',
    'População': '👥',
    'Redes': '📡',
    'Saúde': '❤️',
};

const byCategory = getIndicatorsByCategory();
const CATEGORIES = Object.keys(byCategory) as IndicatorCategory[];

export function CountryIndicators({ countryCode }: CountryIndicatorsProps) {
    const [activeCategory, setActiveCategory] = useState<IndicatorCategory>(CATEGORIES[0]);

    const { series, isLoading, error } = useIndicators([countryCode], ALL_INDICATOR_IDS);

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Spinner size={32} />
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-rose-500 text-sm text-center py-8">
                Erro ao carregar indicadores: {error.message}
            </p>
        );
    }

    const categoryMetas = byCategory[activeCategory] ?? [];

    return (
        <div>
            <h2 className="text-base font-semibold text-[#8b96b0] mb-4 tracking-[0.03em]">
                INDICADORES SOCIOECONÔMICOS
            </h2>

            {/* Category tabs */}
            <div className="flex gap-1.5 flex-wrap mb-6 px-4 py-3 bg-white/5 border border-white/10 rounded-[14px]">
                {CATEGORIES.map((cat) => {
                    const active = cat === activeCategory;
                    return (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex items-center gap-1.5 px-3.5 py-[7px] rounded-[9px] border text-[13px] whitespace-nowrap transition-all duration-200 ${active
                                    ? 'border-[#4f8ef7]/40 bg-[#4f8ef7]/12 text-[#4f8ef7] font-semibold'
                                    : 'border-transparent bg-transparent text-[#8b96b0] font-normal hover:bg-white/5'
                                }`}
                        >
                            <span>{CATEGORY_ICONS[cat]}</span>
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Charts for active category */}
            <div className="flex flex-col gap-4">
                {categoryMetas.map((meta) => {
                    const indicatorSeries = series.filter((s) => s.indicatorId === meta.id);
                    return (
                        <div
                            key={meta.id}
                            className="bg-white/5 border border-white/10 rounded-[14px] px-6 py-5"
                        >
                            <div className="mb-3">
                                <h3 className="text-sm font-semibold text-[#f0f4ff] m-0 mb-[3px]">
                                    {meta.label}
                                </h3>
                                <p className="text-[11px] text-[#4a5568] m-0">
                                    {meta.description} · Unidade: {meta.unit}
                                </p>
                            </div>
                            {indicatorSeries.length === 0 || indicatorSeries[0]?.data.length === 0 ? (
                                <p className="text-[13px] text-[#4a5568] py-3">
                                    Sem dados disponíveis para este indicador.
                                </p>
                            ) : (
                                <LineChart series={indicatorSeries} height={200} yLabel={meta.unit} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
