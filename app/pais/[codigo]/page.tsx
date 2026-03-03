import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowLeftRight } from 'lucide-react';
import type { Metadata } from 'next';
import { ibgeService } from '@/services/ibge.service';
import { CountryHeader } from '@/components/country/CountryHeader';
import { CountryStats } from '@/components/country/CountryStats';
import { CountryIndicators } from '@/components/country/CountryIndicators';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ codigo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { codigo } = await params;
    try {
        const [country] = await ibgeService.getCountries([codigo.toUpperCase()]);
        return {
            title: `${country.name} — Global Insight`,
            description: `Indicadores socioeconômicos de ${country.name}: educação, saúde e turismo.`,
        };
    } catch {
        return { title: 'País — Global Insight' };
    }
}

export default async function CountryPage({ params }: PageProps) {
    const { codigo } = await params;

    let countries;
    try {
        countries = await ibgeService.getCountries([codigo.toUpperCase()]);
    } catch {
        notFound();
    }

    const country = countries?.[0];
    if (!country) notFound();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Top bar */}
            <div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '32px 32px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}
            >
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s',
                    }}
                >
                    <ArrowLeft size={15} />
                    Todos os países
                </Link>

                <Link
                    href={`/comparador?a=${country.code}`}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--accent-blue)',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: 500,
                        background: 'rgba(79,142,247,0.1)',
                        border: '1px solid rgba(79,142,247,0.2)',
                        borderRadius: '9px',
                        padding: '8px 16px',
                    }}
                >
                    <ArrowLeftRight size={14} />
                    Comparar {country.name}
                </Link>
            </div>

            <div
                className="fade-in-up"
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '36px',
                }}
            >
                {/* Header */}
                <section
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        padding: '32px',
                    }}
                >
                    <CountryHeader country={country} />
                </section>

                {/* Stats */}
                <section>
                    <CountryStats country={country} />
                </section>

                {/* History */}
                {country.history && (
                    <section>
                        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '16px', letterSpacing: '0.03em' }}>
                            HISTÓRICO
                        </h2>
                        <div
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                padding: '24px',
                            }}
                        >
                            <p
                                style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '14px',
                                    lineHeight: 1.8,
                                    margin: 0,
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                }}
                            >
                                {country.history}
                            </p>
                        </div>
                    </section>
                )}

                {/* Indicators */}
                <section>
                    <CountryIndicators countryCode={country.code} />
                </section>
            </div>
        </div>
    );
}
