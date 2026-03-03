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
            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
                <Spinner size={32} />
            </div>
        );
    }

    if (error) {
        return (
            <p style={{ color: '#f43f5e', fontSize: '14px', textAlign: 'center', padding: '32px 0' }}>
                Erro ao carregar indicadores: {error.message}
            </p>
        );
    }

    const categoryMetas = byCategory[activeCategory] ?? [];

    return (
        <div>
            <h2 style={{
                fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)',
                marginBottom: '16px', letterSpacing: '0.03em',
            }}>
                INDICADORES SOCIOECONÔMICOS
            </h2>

            {/* Category tabs */}
            <div
                style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                    marginBottom: '24px',
                    padding: '12px 16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                }}
            >
                {CATEGORIES.map((cat) => {
                    const active = cat === activeCategory;
                    return (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 14px',
                                borderRadius: '9px',
                                border: '1px solid',
                                borderColor: active ? 'rgba(79,142,247,0.4)' : 'transparent',
                                background: active ? 'rgba(79,142,247,0.12)' : 'transparent',
                                color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                fontSize: '13px',
                                fontWeight: active ? 600 : 400,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <span>{CATEGORY_ICONS[cat]}</span>
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Charts for active category */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {categoryMetas.map((meta) => {
                    const indicatorSeries = series.filter((s) => s.indicatorId === meta.id);
                    return (
                        <div
                            key={meta.id}
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: '14px',
                                padding: '20px 24px',
                            }}
                        >
                            <div style={{ marginBottom: '12px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 3px' }}>
                                    {meta.label}
                                </h3>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                                    {meta.description} · Unidade: {meta.unit}
                                </p>
                            </div>
                            {indicatorSeries.length === 0 || indicatorSeries[0]?.data.length === 0 ? (
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '12px 0' }}>
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
