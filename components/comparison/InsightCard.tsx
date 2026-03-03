import { Lightbulb } from 'lucide-react';

interface InsightCardProps {
    insights: string[];
}

export function InsightCard({ insights }: InsightCardProps) {
    if (!insights.length) return null;

    return (
        <div className="bg-gradient-to-br from-[#4f8ef7]/[0.08] to-[#6366f1]/5 border border-[#4f8ef7]/20 rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-[9px] bg-[#4f8ef7]/15 border border-[#4f8ef7]/30 flex items-center justify-center text-[#4f8ef7]">
                    <Lightbulb size={16} />
                </div>
                <h3 className="text-sm font-semibold text-[#4f8ef7] m-0 tracking-[0.05em] uppercase">
                    Insights Automáticos
                </h3>
            </div>

            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {insights.map((insight, i) => (
                    <li
                        key={i}
                        className="flex gap-2.5 text-sm text-[#8b96b0] leading-[1.6]"
                    >
                        <span className="text-[#4f8ef7] font-bold shrink-0">→</span>
                        {insight}
                    </li>
                ))}
            </ul>
        </div>
    );
}
