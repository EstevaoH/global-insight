import { ProcessedIndicatorSeries } from '@/types/indicator.types';
import { LineChart } from '@/components/charts/LineChart';
import { INDICATORS_META } from '@/types/indicator.types';

interface ComparisonChartProps {
    series: ProcessedIndicatorSeries[];
}

export function ComparisonChart({ series }: ComparisonChartProps) {
    if (!series.length) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {INDICATORS_META.map((meta) => {
                const filtered = series.filter((s) => s.indicatorId === meta.id);
                return (
                    <div
                        key={meta.id}
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '16px',
                            padding: '24px',
                        }}
                    >
                        <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                                {meta.label}
                            </h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                                Unidade: {meta.unit}
                            </p>
                        </div>
                        <LineChart series={filtered} height={250} yLabel={meta.unit} />
                    </div>
                );
            })}
        </div>
    );
}
