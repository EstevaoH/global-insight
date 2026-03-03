'use client';

import {
    ResponsiveContainer,
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { ProcessedIndicatorSeries } from '@/types/indicator.types';

interface LineChartProps {
    series: ProcessedIndicatorSeries[];
    height?: number;
    yLabel?: string;
}

const COLORS = [
    '#4f8ef7', // blue
    '#a855f7', // purple
    '#10b981', // emerald
    '#f59e0b', // amber
    '#22d3ee', // cyan
    '#f43f5e', // rose
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div
            style={{
                background: '#0d1117',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                minWidth: '160px',
            }}
        >
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 500, marginBottom: '8px' }}>
                {label}
            </p>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {payload.map((entry: any) => (
                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 500 }}>
                        {typeof entry.value === 'number' ? entry.value.toLocaleString('pt-BR') : entry.value}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{entry.name}</span>
                </div>
            ))}
        </div>
    );
};

export function LineChart({ series, height = 280, yLabel }: LineChartProps) {
    if (!series.length) return (
        <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Sem dados disponíveis.</p>
        </div>
    );

    // Merge all years across series into one x-axis
    const yearsSet = new Set<number>();
    series.forEach((s) => s.data.forEach((d) => yearsSet.add(d.year)));
    const years = Array.from(yearsSet).sort((a, b) => a - b);

    // Build recharts data format: [{year: 2010, "Brasil": 5.65, "EUA": 6.69}]
    const data = years.map((year) => {
        const point: Record<string, number | string> = { year: String(year) };
        series.forEach((s) => {
            const dp = s.data.find((d) => d.year === year);
            if (dp !== undefined) point[s.countryName] = dp.value * s.multiplier;
        });
        return point;
    });

    return (
        <ResponsiveContainer width="100%" height={height}>
            <ReLineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                    dataKey="year"
                    tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                    axisLine={{ stroke: 'var(--border)' }}
                    tickLine={false}
                    interval="preserveStartEnd"
                />
                <YAxis
                    tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 10 } : undefined}
                    width={yLabel ? 52 : 36}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)', paddingTop: '12px' }}
                />
                {series.map((s, i) => (
                    <Line
                        key={`${s.countryCode}-${s.indicatorId}`}
                        type="monotone"
                        dataKey={s.countryName}
                        stroke={COLORS[i % COLORS.length]}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                        connectNulls
                    />
                ))}
            </ReLineChart>
        </ResponsiveContainer>
    );
}
