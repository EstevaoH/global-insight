import Image from 'next/image';
import Link from 'next/link';
import { ProcessedIndicatorSeries } from '@/types/indicator.types';
import { getLatestDataPoint } from '@/services/indicator.service';

interface RankingTableProps {
    series: ProcessedIndicatorSeries[];
    unit: string;
}

export function RankingTable({ series, unit }: RankingTableProps) {
    if (!series.length) {
        return (
            <p className="text-center text-[#8b96b0] py-10">
                Sem dados disponíveis para este indicador.
            </p>
        );
    }

    const MEDAL = ['🥇', '🥈', '🥉'];

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[48px_1fr_120px] py-3 px-5 border-b border-white/10 text-[11px] font-semibold text-[#4a5568] uppercase tracking-[0.08em]">
                <span>#</span>
                <span>País</span>
                <span className="text-right">{unit}</span>
            </div>

            {/* Rows */}
            {series.map((s, i) => {
                const latest = getLatestDataPoint(s);
                const isTop3 = i < 3;
                const pct = latest && series[0] ? (latest.value / (getLatestDataPoint(series[0])?.value ?? 1)) * 100 : 0;

                return (
                    <Link
                        key={s.countryCode}
                        href={`/pais/${s.countryCode}`}
                        className="no-underline block"
                    >
                        <div
                            className={`grid grid-cols-[48px_1fr_120px] py-3.5 px-5 items-center border-b border-white/10 transition-colors duration-150 ${isTop3 ? 'bg-[#4f8ef7]/[0.04] hover:bg-white/5' : 'bg-transparent hover:bg-[#4f8ef7]/[0.04]'}`}
                        >
                            {/* Position */}
                            <span className={`text-sm font-bold ${isTop3 ? 'text-[#4f8ef7]' : 'text-[#8b96b0]'}`}>
                                {MEDAL[i] ?? `${i + 1}º`}
                            </span>

                            {/* Country */}
                            <div className="flex items-center gap-2.5">
                                <div className="w-[30px] h-[21px] rounded shrink-0 relative border border-white/10 overflow-hidden">
                                    <Image
                                        src={`https://flagcdn.com/w80/${s.countryCode.toLowerCase()}.png`}
                                        alt=""
                                        fill
                                        sizes="30px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="m-0 text-sm font-medium text-[#f0f4ff] truncate">
                                        {s.countryName}
                                    </p>
                                    {/* Mini bar */}
                                    <div className="mt-1 h-[3px] rounded-full bg-white/10 overflow-hidden max-w-[180px]">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ease-out ${isTop3 ? 'bg-[#4f8ef7]' : 'bg-[#4f8ef7]/50'}`}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Value */}
                            <span className={`text-right text-sm font-semibold ${isTop3 ? 'text-[#f0f4ff]' : 'text-[#8b96b0]'}`}>
                                {latest ? latest.value.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : '—'}
                                {latest && <span className="text-[10px] text-[#4a5568] ml-[3px]">{latest.year}</span>}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
