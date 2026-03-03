'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ChevronDown, Search, X } from 'lucide-react';
import { Country } from '@/types/country.types';

interface CountrySelectorProps {
    countries: Country[];
    value: Country | null;
    onChange: (c: Country | null) => void;
    placeholder?: string;
    id?: string;
}

export function CountrySelector({ countries, value, onChange, placeholder = 'Selecionar país…', id }: CountrySelectorProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        if (!q) return countries;
        return countries.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.nameEN.toLowerCase().includes(q) ||
                c.code.toLowerCase() === q
        );
    }, [countries, query]);

    const select = (c: Country) => {
        onChange(c);
        setOpen(false);
        setQuery('');
    };

    return (
        <div className="relative" id={id}>
            {/* Trigger */}
            <button
                onClick={() => setOpen((o) => !o)}
                className={`w-full h-[52px] flex items-center gap-3 px-4 bg-white/5 border border-white/10 rounded-xl text-[15px] font-[inherit] transition-colors duration-200 text-left cursor-pointer ${value ? 'text-[#f0f4ff] font-medium' : 'text-[#8b96b0] font-normal'}`}
            >
                {value ? (
                    <>
                        <div className="w-8 h-[22px] rounded-[4px] relative shrink-0 border border-white/10 overflow-hidden">
                            <Image src={`https://flagcdn.com/w80/${value.code.toLowerCase()}.png`} alt="" fill className="object-cover" sizes="32px" />
                        </div>
                        {value.name}
                        <span className="ml-auto text-[11px] text-[#4a5568] font-mono">{value.code}</span>
                    </>
                ) : (
                    <>
                        <Search size={16} className="shrink-0" />
                        {placeholder}
                    </>
                )}
                <ChevronDown size={15} className={`shrink-0 transition-transform duration-200 text-[#8b96b0] ${value ? 'ml-0' : 'ml-auto'} ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Clear */}
            {value && (
                <button
                    onClick={(e) => { e.stopPropagation(); onChange(null); }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#4a5568] cursor-pointer flex p-1 hover:text-[#f0f4ff] transition-colors"
                >
                    <X size={14} />
                </button>
            )}

            {/* Dropdown */}
            {open && (
                <div className="absolute top-[56px] left-0 right-0 z-[100] bg-[#0d1117] border border-white/10 rounded-[14px] shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Search */}
                    <div className="p-3 pb-2 border-b border-white/10">
                        <div className="relative">
                            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4a5568]" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Buscar…"
                                className="w-full h-9 bg-white/5 border border-white/10 rounded-lg pl-[30px] pr-2.5 text-[#f0f4ff] text-[13px] outline-none font-[inherit] focus:border-[#4f8ef7]/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div className="max-h-[260px] overflow-y-auto">
                        {filtered.length === 0 ? (
                            <p className="p-4 text-center text-[#8b96b0] text-[13px]">Sem resultados</p>
                        ) : (
                            filtered.map((c) => (
                                <button
                                    key={c.code}
                                    onClick={() => select(c)}
                                    className={`w-full flex items-center gap-2.5 py-2.5 px-3.5 border-none text-[#f0f4ff] text-left cursor-pointer text-sm font-[inherit] transition-colors duration-150 ${value?.code === c.code ? 'bg-[#4f8ef7]/10' : 'bg-transparent hover:bg-white/5'}`}
                                >
                                    <div className="w-7 h-5 rounded-[3px] relative shrink-0 border border-white/10 overflow-hidden">
                                        <Image src={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png`} alt="" fill className="object-cover" sizes="28px" />
                                    </div>
                                    <span className="flex-1">{c.name}</span>
                                    <span className="font-mono text-[10px] text-[#4a5568]">{c.code}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
