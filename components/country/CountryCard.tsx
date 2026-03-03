import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Country } from '@/types/country.types';
import { Badge, regionVariant } from '@/components/ui/Badge';

interface CountryCardProps {
    country: Country;
    index?: number;
}

export function CountryCard({ country, index = 0 }: CountryCardProps) {
    const delay = Math.min(index * 30, 600);

    return (
        <Link
            className='no-underline block'
            href={`/pais/${country.code}`}
        >
            <article
                className="glass-card fade-in-up w-full p-5 flex flex-col gap-3.5 h-full cursor-pointer"
                style={{ animationDelay: `${delay}ms` }}
            >
                {/* Flag + Code */}
                <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-10 rounded-md overflow-hidden shrink-0 bg-[#0d1117] border border-white/10 relative">
                        <Image
                            src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
                            alt={`Bandeira de ${country.name}`}
                            fill
                            sizes="56px"
                            className="object-cover"
                            onError={() => { }}
                        />
                    </div>
                    <span className="font-mono text-[11px] text-[#4a5568] bg-white/5 border border-white/10 px-[7px] py-[2px] rounded-[5px] tracking-[0.08em]">
                        {country.code}
                    </span>
                </div>

                {/* Name */}
                <div>
                    <h3 className="text-base font-semibold text-[#f0f4ff] m-0 mb-0.5">
                        {country.name}
                    </h3>
                    <p className="text-xs text-[#4a5568] m-0">{country.nameEN}</p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[#8b96b0] text-xs">
                    <MapPin size={12} />
                    <span className="truncate">
                        {country.capital || '—'}
                    </span>
                </div>

                {/* Region badge */}
                <div className='mt-auto pt-1 w-full'>
                    <Badge variant={regionVariant(country.region)}>{country.subRegion}</Badge>
                </div>
            </article>
        </Link>
    );
}
