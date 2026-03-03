import Image from 'next/image';
import { MapPin, SquareArrowOutUpRight } from 'lucide-react';
import { Country } from '@/types/country.types';
import { Badge, regionVariant } from '@/components/ui/Badge';

interface CountryHeaderProps {
    country: Country;
}

export function CountryHeader({ country }: CountryHeaderProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '28px',
                flexWrap: 'wrap',
            }}
        >
            {/* Flag */}
            <div
                style={{
                    width: '100px',
                    height: '70px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
            >
                <Image
                    src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
                    alt={`Bandeira de ${country.name}`}
                    fill
                    sizes="100px"
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, margin: 0 }}>
                        {country.name}
                    </h1>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            color: 'var(--text-muted)',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid var(--border)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            letterSpacing: '0.08em',
                        }}
                    >
                        {country.code3}
                    </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: '0 0 12px', fontStyle: 'italic' }}>
                    {country.nameEN}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <Badge variant={regionVariant(country.region)}>{country.subRegion}</Badge>

                    {country.capital && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                            <MapPin size={13} />
                            {country.capital}
                        </span>
                    )}

                    {country.areaTotalKm2 > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                            <SquareArrowOutUpRight size={12} />
                            {country.areaTotalKm2.toLocaleString('pt-BR')} km²
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
