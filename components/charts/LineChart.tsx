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
        <div className="bg-[#0d1117] border border-white/10 rounded-[10px] py-3 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] min-w-[160px]">
            <p className="text-xs font-medium text-[#8b96b0] mb-2">
                {label}
            </p>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {payload.map((entry: any) => (
                <div key={entry.name} className="flex items-center gap-2 mb-1">
                    <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: entry.color }}
                    />
                    <span className="text-[13px] font-medium text-[#f0f4ff]">
                        {typeof entry.value === 'number' ? entry.value.toLocaleString('pt-BR') : entry.value}
                    </span>
                    <span className="text-[11px] text-[#4a5568]">{entry.name}</span>
                </div>
            ))}
        </div>
    );
};

export function LineChart({ series, height = 280, yLabel }: LineChartProps) {
    if (!series.length) return (
        <div className="flex items-center justify-center" style={{ height }}>
            <p className="text-[#8b96b0] text-sm">Sem dados disponíveis.</p>
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
                    tick={{ fill: '#4a5568', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                    interval="preserveStartEnd"
                />
                <YAxis
                    tick={{ fill: '#4a5568', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fill: '#4a5568', fontSize: 10 } : undefined}
                    width={yLabel ? 52 : 36}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    wrapperStyle={{ fontSize: '12px', color: '#8b96b0', paddingTop: '12px' }}
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
