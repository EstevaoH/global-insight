import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'blue' | 'emerald' | 'amber' | 'purple' | 'cyan';
}

const colors = {
    default: { bg: 'rgba(99,102,241,0.12)', text: '#818cf8', border: 'rgba(99,102,241,0.25)' },
    blue: { bg: 'rgba(79,142,247,0.12)', text: '#4f8ef7', border: 'rgba(79,142,247,0.25)' },
    emerald: { bg: 'rgba(16,185,129,0.12)', text: '#10b981', border: 'rgba(16,185,129,0.25)' },
    amber: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
    purple: { bg: 'rgba(168,85,247,0.12)', text: '#a855f7', border: 'rgba(168,85,247,0.25)' },
    cyan: { bg: 'rgba(34,211,238,0.12)', text: '#22d3ee', border: 'rgba(34,211,238,0.25)' },
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
    const c = colors[variant];
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: '99px',
                fontSize: '12px',
                fontWeight: 500,
                background: c.bg,
                color: c.text,
                border: `1px solid ${c.border}`,
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
            }}
        >
            {children}
        </span>
    );
}

/** Mapeia região IBGE → variante de cor */
export function regionVariant(region: string): BadgeProps['variant'] {
    const r = region.toLowerCase();
    if (r.includes('amér')) return 'amber';
    if (r.includes('europ')) return 'blue';
    if (r.includes('ásia') || r.includes('asia')) return 'purple';
    if (r.includes('afric')) return 'emerald';
    if (r.includes('ocean')) return 'cyan';
    return 'default';
}
