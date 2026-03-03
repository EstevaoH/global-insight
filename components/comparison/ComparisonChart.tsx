import { ProcessedIndicatorSeries } from '@/types/indicator.types';
import { LineChart } from '@/components/charts/LineChart';
import { INDICATORS_META } from '@/types/indicator.types';

interface ComparisonChartProps {
    series: ProcessedIndicatorSeries[];
}

export function ComparisonChart({ series }: ComparisonChartProps) {
    if (!series.length) return null;

    return (
        <div className="flex flex-col gap-5">
            {INDICATORS_META.map((meta) => {
                const filtered = series.filter((s) => s.indicatorId === meta.id);
                return (
                    <div
                        key={meta.id}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6"
                    >
                        <div className="mb-4">
                            <h3 className="text-[15px] font-semibold text-[#f0f4ff] m-0 mb-1">
                                {meta.label}
                            </h3>
                            <p className="text-xs text-[#4a5568] m-0">
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
