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
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-[18px] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-[9px] bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 flex items-center justify-center shrink-0 text-[#4f8ef7]">
                {icon}
            </div>
            <div>
                <p className="text-[11px] text-[#4a5568] m-0 mb-1 uppercase tracking-[0.06em] font-semibold">
                    {label}
                </p>
                <p className="text-sm text-[#f0f4ff] m-0 font-medium">
                    {value || '—'}
                </p>
            </div>
        </div>
    );
}

export function CountryStats({ country }: CountryStatsProps) {
    return (
        <div>
            <h2 className="text-base font-semibold text-[#8b96b0] mb-4 tracking-[0.03em]">
                INFORMAÇÕES GERAIS
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                <StatItem icon={<Globe2 size={16} />} label="Região" value={country.region} />
                <StatItem icon={<Map size={16} />} label="Sub-região" value={country.subRegion} />
                <StatItem icon={<Languages size={16} />} label="Idioma(s)" value={country.languages.join(', ')} />
                <StatItem icon={<Banknote size={16} />} label="Moeda" value={country.currencies[0] ?? '—'} />
            </div>
        </div>
    );
}
