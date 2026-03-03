import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'blue' | 'emerald' | 'amber' | 'purple' | 'cyan';
}

const colorClasses = {
    default: 'bg-[#6366f1]/15 text-[#818cf8] border-[#6366f1]/30',
    blue: 'bg-[#4f8ef7]/15 text-[#4f8ef7] border-[#4f8ef7]/30',
    emerald: 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30',
    amber: 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30',
    purple: 'bg-[#a855f7]/15 text-[#a855f7] border-[#a855f7]/30',
    cyan: 'bg-[#22d3ee]/15 text-[#22d3ee] border-[#22d3ee]/30',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
    const classes = colorClasses[variant];
    return (
        <span
            className={`flex flex-wrap items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium border tracking-wide ${classes}`}
            title={typeof children === 'string' ? children : undefined}
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
