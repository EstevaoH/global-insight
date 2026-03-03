import Image from 'next/image';
import { MapPin, SquareArrowOutUpRight } from 'lucide-react';
import { Country } from '@/types/country.types';
import { Badge, regionVariant } from '@/components/ui/Badge';

interface CountryHeaderProps {
    country: Country;
}

export function CountryHeader({ country }: CountryHeaderProps) {
    return (
        <div className="flex items-start gap-7 flex-wrap">
            {/* Flag */}
            <div className="w-[100px] h-[70px] rounded-[10px] overflow-hidden shrink-0 bg-[#0d1117] border border-white/10 relative shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <Image
                    src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
                    alt={`Bandeira de ${country.name}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                    priority
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h1 className="text-[clamp(24px,4vw,36px)] font-extrabold m-0">
                        {country.name}
                    </h1>
                    <span className="font-mono text-[13px] text-[#4a5568] bg-white/5 border border-white/10 px-2 py-[3px] rounded-md tracking-[0.08em]">
                        {country.code3}
                    </span>
                </div>

                <p className="text-[#8b96b0] text-[15px] m-0 mb-3 italic">
                    {(() => {
                        const codes = country.languageCodes;
                        if (codes && codes.length > 0) {
                            try {
                                const nativeName = new Intl.DisplayNames([codes[0]], { type: 'region' }).of(country.code);
                                if (nativeName && nativeName !== country.code) {
                                    return nativeName;
                                }
                            } catch (e) {
                                // Fallback
                            }
                        }
                        return country.nameEN;
                    })()}
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant={regionVariant(country.region)}>{country.subRegion}</Badge>

                    {country.capital && (
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${country.capital}, ${country.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[#8b96b0] text-[13px] no-underline hover:text-[#f0f4ff] transition-colors"
                        >
                            <MapPin size={13} />
                            <span className="hover:underline">{country.capital}</span>
                        </a>
                    )}

                    {country.areaTotalKm2 > 0 && (
                        <span className="flex items-center gap-1.5 text-[#8b96b0] text-[13px]">
                            <SquareArrowOutUpRight size={12} />
                            {country.areaTotalKm2.toLocaleString('pt-BR')} km²
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
