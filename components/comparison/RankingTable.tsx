import Image from 'next/image';
import Link from 'next/link';
import { ProcessedIndicatorSeries } from '@/types/indicator.types';
import { getLatestDataPoint } from '@/services/indicator.service';

interface RankingTableProps {
    series: ProcessedIndicatorSeries[];
    unit: string;
}

export function RankingTable({ series, unit }: RankingTableProps) {
    if (!series.length) {
        return (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
                Sem dados disponíveis para este indicador.
            </p>
        );
    }

    const MEDAL = ['🥇', '🥈', '🥉'];

    return (
        <div
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr 120px',
                    padding: '12px 20px',
                    borderBottom: '1px solid var(--border)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                }}
            >
                <span>#</span>
                <span>País</span>
                <span style={{ textAlign: 'right' }}>{unit}</span>
            </div>

            {/* Rows */}
            {series.map((s, i) => {
                const latest = getLatestDataPoint(s);
                const isTop3 = i < 3;
                const pct = latest && series[0] ? (latest.value / (getLatestDataPoint(series[0])?.value ?? 1)) * 100 : 0;

                return (
                    <Link
                        key={s.countryCode}
                        href={`/pais/${s.countryCode}`}
                        style={{ textDecoration: 'none', display: 'block' }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '48px 1fr 120px',
                                padding: '14px 20px',
                                alignItems: 'center',
                                borderBottom: '1px solid var(--border)',
                                background: isTop3 ? 'rgba(79,142,247,0.04)' : 'transparent',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = isTop3 ? 'rgba(79,142,247,0.04)' : 'transparent')}
                        >
                            {/* Position */}
                            <span style={{ fontSize: '14px', fontWeight: 700, color: isTop3 ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
                                {MEDAL[i] ?? `${i + 1}º`}
                            </span>

                            {/* Country */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '30px', height: '21px', borderRadius: '4px', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '1px solid var(--border)' }}>
                                    <Image
                                        src={`https://flagcdn.com/w80/${s.countryCode.toLowerCase()}.png`}
                                        alt=""
                                        fill
                                        sizes="30px"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {s.countryName}
                                    </p>
                                    {/* Mini bar */}
                                    <div style={{ marginTop: '4px', height: '3px', borderRadius: '99px', background: 'var(--border)', overflow: 'hidden', maxWidth: '180px' }}>
                                        <div
                                            style={{
                                                height: '100%',
                                                width: `${pct}%`,
                                                background: isTop3 ? 'var(--accent-blue)' : 'rgba(79,142,247,0.5)',
                                                borderRadius: '99px',
                                                transition: 'width 0.6s ease',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Value */}
                            <span style={{ textAlign: 'right', fontSize: '14px', fontWeight: 600, color: isTop3 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                {latest ? latest.value.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : '—'}
                                {latest && <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '3px' }}>{latest.year}</span>}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
