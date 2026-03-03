'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeftRight, RefreshCw } from 'lucide-react';
import { Country } from '@/types/country.types';
import { ibgeService } from '@/services/ibge.service';
import { useIndicators } from '@/hooks/useIndicators';
import { CountrySelector } from '@/components/comparison/CountrySelector';
import { ComparisonChart } from '@/components/comparison/ComparisonChart';
import { InsightCard } from '@/components/comparison/InsightCard';
import { SpinnerPage } from '@/components/ui/Spinner';
import { ALL_INDICATOR_IDS, INDICATORS_META } from '@/types/indicator.types';
import { generateComparisonInsight, getLatestDataPoint } from '@/services/indicator.service';

export const dynamic = 'force-dynamic';

export default function ComparadorPage() {
    const searchParams = useSearchParams();
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [countryA, setCountryA] = useState<Country | null>(null);
    const [countryB, setCountryB] = useState<Country | null>(null);

    // Pre-select from query params (?a=BR&b=US)
    useEffect(() => {
        ibgeService.getAllCountries().then((all) => {
            const sorted = all.sort((a, b) => a.name.localeCompare(b.name, 'pt'));
            setCountries(sorted);
            const codeA = searchParams.get('a')?.toUpperCase();
            const codeB = searchParams.get('b')?.toUpperCase();
            if (codeA) setCountryA(sorted.find((c) => c.code === codeA) ?? null);
            if (codeB) setCountryB(sorted.find((c) => c.code === codeB) ?? null);
            setLoading(false);
        });
    }, [searchParams]);

    const codes = useMemo(() => {
        const c: string[] = [];
        if (countryA) c.push(countryA.code);
        if (countryB) c.push(countryB.code);
        return c;
    }, [countryA, countryB]);

    const { series, isLoading: seriesLoading } = useIndicators(codes, codes.length === 2 ? ALL_INDICATOR_IDS : []);

    // Auto-generate insights for each indicator
    const insights = useMemo(() => {
        if (!countryA || !countryB || !series.length) return [];
        const results: string[] = [];
        const FROM = 2010;
        const TO = 2020;
        for (const meta of INDICATORS_META) {
            const sA = series.find((s) => s.countryCode === countryA.code && s.indicatorId === meta.id);
            const sB = series.find((s) => s.countryCode === countryB.code && s.indicatorId === meta.id);
            if (sA && sB) {
                results.push(generateComparisonInsight(sA, sB, FROM, TO));
            }
        }
        // Latest value comparison
        if (results.length === 0) {
            const sA = series.find((s) => s.countryCode === countryA.code);
            const sB = series.find((s) => s.countryCode === countryB.code);
            if (sA && sB) {
                const latA = getLatestDataPoint(sA);
                const latB = getLatestDataPoint(sB);
                if (latA && latB) {
                    const leader = latA.value > latB.value ? countryA.name : countryB.name;
                    results.push(`Em ${Math.max(latA.year, latB.year)}, ${leader} apresentou o maior valor em "${sA.indicatorName}".`);
                }
            }
        }
        return results;
    }, [countryA, countryB, series]);

    const swap = () => {
        setCountryA(countryB);
        setCountryB(countryA);
    };

    if (loading) return <SpinnerPage />;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Header */}
            <section style={{ padding: '48px 32px 0', maxWidth: '900px', margin: '0 auto' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '10px' }}>
                    Comparador
                </p>
                <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, margin: '0 0 8px' }}>
                    Compare{' '}
                    <span style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        Países
                    </span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: '0 0 36px' }}>
                    Selecione dois países para visualizar e comparar seus indicadores socioeconômicos.
                </p>

                {/* Country selectors */}
                <div
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        padding: '28px',
                        display: 'grid',
                        gridTemplateColumns: '1fr auto 1fr',
                        gap: '16px',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
                            País A
                        </label>
                        <CountrySelector countries={countries} value={countryA} onChange={setCountryA} id="selector-a" />
                    </div>

                    <button
                        onClick={swap}
                        title="Trocar países"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'rgba(79,142,247,0.1)',
                            border: '1px solid rgba(79,142,247,0.2)',
                            color: 'var(--accent-blue)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '22px',
                            transition: 'background 0.2s',
                        }}
                    >
                        <ArrowLeftRight size={16} />
                    </button>

                    <div>
                        <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
                            País B
                        </label>
                        <CountrySelector countries={countries} value={countryB} onChange={setCountryB} id="selector-b" />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 32px 80px' }}>
                {!countryA || !countryB ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</p>
                        <p style={{ fontSize: '16px' }}>Selecione dois países para iniciar a comparação.</p>
                    </div>
                ) : seriesLoading ? (
                    <SpinnerPage />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Countries header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                            <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--accent-blue)' }}>{countryA.name}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>vs</span>
                            <span style={{ fontWeight: 700, fontSize: '18px', color: '#a855f7' }}>{countryB.name}</span>
                        </div>

                        {/* Insights */}
                        {insights.length > 0 && <InsightCard insights={insights} />}

                        {/* Charts */}
                        {series.length > 0 ? (
                            <ComparisonChart series={series} />
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '32px', color: 'var(--text-muted)' }}>
                                <RefreshCw size={16} />
                                <span>Sem dados de indicadores para estes países.</span>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
