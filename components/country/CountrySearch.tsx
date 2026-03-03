'use client';

import { useState, useDeferredValue } from 'react';
import { Search, X } from 'lucide-react';
import { Country } from '@/types/country.types';
import { CountryCard } from './CountryCard';

interface CountryGridProps {
    countries: Country[];
}

export function CountrySearchGrid({ countries }: CountryGridProps) {
    const [query, setQuery] = useState('');
    const [region, setRegion] = useState('');
    const deferredQuery = useDeferredValue(query);
    const deferredRegion = useDeferredValue(region);

    const regions = Array.from(new Set(countries.map(c => c.region))).filter(Boolean).sort();

    const filtered = countries.filter((c) => {
        // Filtro por região
        if (deferredRegion && c.region !== deferredRegion) return false;

        // Filtro por busca de texto
        const q = deferredQuery.toLowerCase();
        if (!q) return true;

        return (
            c.name.toLowerCase().includes(q) ||
            c.nameEN.toLowerCase().includes(q) ||
            c.code.toLowerCase().includes(q) ||
            c.code3.toLowerCase().includes(q) ||
            c.subRegion.toLowerCase().includes(q) ||
            c.capital.toLowerCase().includes(q)
        );
    });

    return (
        <div>
            {/* Search input and Region filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-9">
                <div className="relative flex-1 max-w-[480px]">
                    <Search
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5568] pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por nome, código ou capital…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-11 text-[#f0f4ff] text-sm outline-none transition-colors duration-200 focus:border-[#4f8ef7]/40"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#f0f4ff] transition-colors p-1 flex bg-transparent border-none cursor-pointer"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <div className="w-full sm:w-[200px]">
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-[#f0f4ff] text-sm outline-none transition-colors duration-200 focus:border-[#4f8ef7]/40 appearance-none cursor-pointer"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238b96b0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 16px center',
                            paddingRight: '40px'
                        }}
                    >
                        <option value="" className="bg-[#0d1117] text-[#f0f4ff]">Todas as Regiões</option>
                        {regions.map(r => (
                            <option key={r} value={r} className="bg-[#0d1117] text-[#f0f4ff]">{r}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results count */}
            <p className="text-[13px] text-[#4a5568] mb-5">
                {filtered.length === countries.length
                    ? `${countries.length} países`
                    : `${filtered.length} de ${countries.length} países`}
            </p>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 text-[#4a5568]">
                    <p className="text-[32px] mb-3">🔍</p>
                    <p className="text-base">Nenhum país encontrado para &ldquo;{query}&rdquo;</p>
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                    {filtered.map((c, i) => (
                        <CountryCard key={c.code} country={c} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
