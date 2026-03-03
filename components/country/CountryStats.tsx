import { Languages, Banknote, Globe2, Map } from 'lucide-react';
import { Country } from '@/types/country.types';

interface CountryStatsProps {
    country: Country;
}

interface StatItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function StatItem({ icon, label, value }: StatItemProps) {
    return (
        <div
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
            }}
        >
            <div
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',
                    background: 'rgba(79,142,247,0.1)',
                    border: '1px solid rgba(79,142,247,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--accent-blue)',
                }}
            >
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                    {label}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                    {value || '—'}
                </p>
            </div>
        </div>
    );
}

export function CountryStats({ country }: CountryStatsProps) {
    return (
        <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '16px', letterSpacing: '0.03em' }}>
                INFORMAÇÕES GERAIS
            </h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '12px',
                }}
            >
                <StatItem icon={<Globe2 size={16} />} label="Região" value={country.region} />
                <StatItem icon={<Map size={16} />} label="Sub-região" value={country.subRegion} />
                <StatItem icon={<Languages size={16} />} label="Idioma(s)" value={country.languages.join(', ')} />
                <StatItem icon={<Banknote size={16} />} label="Moeda" value={country.currencies[0] ?? '—'} />
            </div>
        </div>
    );
}
