import { Lightbulb } from 'lucide-react';

interface InsightCardProps {
    insights: string[];
}

export function InsightCard({ insights }: InsightCardProps) {
    if (!insights.length) return null;

    return (
        <div
            style={{
                background: 'linear-gradient(135deg, rgba(79,142,247,0.08) 0%, rgba(99,102,241,0.05) 100%)',
                border: '1px solid rgba(79,142,247,0.2)',
                borderRadius: '16px',
                padding: '24px',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '9px',
                        background: 'rgba(79,142,247,0.15)',
                        border: '1px solid rgba(79,142,247,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-blue)',
                    }}
                >
                    <Lightbulb size={16} />
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-blue)', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Insights Automáticos
                </h3>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {insights.map((insight, i) => (
                    <li
                        key={i}
                        style={{
                            display: 'flex',
                            gap: '10px',
                            fontSize: '14px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                        }}
                    >
                        <span style={{ color: 'var(--accent-blue)', fontWeight: 700, flexShrink: 0 }}>→</span>
                        {insight}
                    </li>
                ))}
            </ul>
        </div>
    );
}
