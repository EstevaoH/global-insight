'use client';

import { useState, useEffect, useMemo } from 'react';
import { BarChart2 } from 'lucide-react';
import { ibgeService } from '@/services/ibge.service';
import { useIndicators } from '@/hooks/useIndicators';
import { RankingTable } from '@/components/comparison/RankingTable';
import { SpinnerPage } from '@/components/ui/Spinner';
import {
    INDICATORS_META,
    ALL_INDICATOR_IDS,
    INDICATOR_IDS,
    getIndicatorsByCategory,
    IndicatorCategory,
    ProcessedIndicatorSeries,
} from '@/types/indicator.types';
import { rankSeriesByLatestValue } from '@/services/indicator.service';

export const dynamic = 'force-dynamic';

const byCategory = getIndicatorsByCategory();
const CATEGORIES = Object.keys(byCategory) as IndicatorCategory[];

const CATEGORY_ICONS: Record<IndicatorCategory, string> = {
    'Economia': '💹',
    'Indicadores Sociais': '🏥',
    'Meio Ambiente': '🌿',
    'População': '👥',
    'Redes': '📡',
    'Saúde': '❤️',
};

export default function RankingPage() {
    const [allCodes, setAllCodes] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<IndicatorCategory>('Economia');
    const [selectedId, setSelectedId] = useState<number>(INDICATOR_IDS.GDP_PER_CAPITA);
    const [order, setOrder] = useState<'desc' | 'asc'>('desc');

    useEffect(() => {
        ibgeService.getAllCountries().then((countries) => {
            setAllCodes(countries.map((c) => c.code));
            setLoading(false);
        });
    }, []);

    // When category changes, default-select the first indicator in that category
    const handleCategoryChange = (cat: IndicatorCategory) => {
        setActiveCategory(cat);
        const first = byCategory[cat]?.[0];
        if (first) setSelectedId(first.id);
    };

    const { series, isLoading: seriesLoading } = useIndicators(
        allCodes,
        allCodes.length > 0 ? ALL_INDICATOR_IDS : []
    );

    const ranked: ProcessedIndicatorSeries[] = useMemo(() => {
        const filtered = series.filter((s) => s.indicatorId === selectedId && s.data.length > 0);
        return rankSeriesByLatestValue(filtered, order);
    }, [series, selectedId, order]);

    const selectedMeta = INDICATORS_META.find((m) => m.id === selectedId)!;
    const categoryMetas = byCategory[activeCategory] ?? [];

    if (loading) return <SpinnerPage />;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Header */}
            <section style={{ padding: '48px 32px 0', maxWidth: '860px', margin: '0 auto' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '10px' }}>
                    Ranking
                </p>
                <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, margin: '0 0 8px' }}>
                    Países por{' '}
                    <span style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        Indicador
                    </span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: '0 0 32px' }}>
                    Ranking com dados reais do IBGE ordenados pelo valor mais recente.
                </p>

                {/* Controls */}
                <div
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        marginBottom: '16px',
                    }}
                >
                    {/* Category tabs */}
                    <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>
                        Categoria
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {CATEGORIES.map((cat) => {
                            const active = cat === activeCategory;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        padding: '6px 13px',
                                        borderRadius: '9px',
                                        border: '1px solid',
                                        borderColor: active ? 'rgba(79,142,247,0.4)' : 'var(--border)',
                                        background: active ? 'rgba(79,142,247,0.12)' : 'transparent',
                                        color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                        fontSize: '12px',
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

                    {/* Indicator selector for active category */}
                    <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>
                        Indicador
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {categoryMetas.map((meta) => {
                            const active = meta.id === selectedId;
                            return (
                                <button
                                    key={meta.id}
                                    onClick={() => setSelectedId(meta.id)}
                                    style={{
                                        padding: '6px 13px',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: active ? 'rgba(79,142,247,0.35)' : 'var(--border)',
                                        background: active ? 'rgba(79,142,247,0.10)' : 'rgba(255,255,255,0.02)',
                                        color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                        fontSize: '12px',
                                        fontWeight: active ? 600 : 400,
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {meta.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Order toggle + count */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BarChart2 size={14} style={{ color: 'var(--accent-blue)' }} />
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
                            {selectedMeta?.description}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                        {!seriesLoading && (
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                {ranked.length} países com dados
                            </span>
                        )}
                        <button
                            onClick={() => setOrder((o) => (o === 'desc' ? 'asc' : 'desc'))}
                            style={{
                                padding: '7px 14px',
                                borderRadius: '9px',
                                border: '1px solid var(--border)',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {order === 'desc' ? '↓ Maior → Menor' : '↑ Menor → Maior'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Table */}
            <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px 80px' }}>
                {seriesLoading ? (
                    <SpinnerPage />
                ) : (
                    <RankingTable series={ranked} unit={selectedMeta?.unit ?? ''} />
                )}
            </section>
        </div>
    );
}
