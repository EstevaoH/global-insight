import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Country } from '@/types/country.types';
import { Badge, regionVariant } from '@/components/ui/Badge';

interface CountryCardProps {
    country: Country;
    index?: number;
}

export function CountryCard({ country, index = 0 }: CountryCardProps) {
    const delay = Math.min(index * 30, 600);

    return (
        <Link
            href={`/pais/${country.code}`}
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <article
                className="glass-card fade-in-up"
                style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    height: '100%',
                    animationDelay: `${delay}ms`,
                    cursor: 'pointer',
                }}
            >
                {/* Flag + Code */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div
                        style={{
                            width: '56px',
                            height: '40px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            position: 'relative',
                        }}
                    >
                        <Image
                            src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
                            alt={`Bandeira de ${country.name}`}
                            fill
                            sizes="56px"
                            style={{ objectFit: 'cover' }}
                            onError={() => { }}
                        />
                    </div>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            color: 'var(--text-muted)',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid var(--border)',
                            padding: '2px 7px',
                            borderRadius: '5px',
                            letterSpacing: '0.08em',
                        }}
                    >
                        {country.code}
                    </span>
                </div>

                {/* Name */}
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, marginBottom: '2px' }}>
                        {country.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{country.nameEN}</p>
                </div>

                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                    <MapPin size={12} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {country.capital || '—'}
                    </span>
                </div>

                {/* Region badge */}
                <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                    <Badge variant={regionVariant(country.region)}>{country.subRegion}</Badge>
                </div>
            </article>
        </Link>
    );
}
