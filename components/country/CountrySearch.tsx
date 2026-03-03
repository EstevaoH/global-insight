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
    const deferred = useDeferredValue(query);

    const filtered = countries.filter((c) => {
        const q = deferred.toLowerCase();
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
            {/* Search input */}
            <div
                style={{
                    position: 'relative',
                    maxWidth: '480px',
                    marginBottom: '36px',
                }}
            >
                <Search
                    size={16}
                    style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                        pointerEvents: 'none',
                    }}
                />
                <input
                    type="text"
                    placeholder="Buscar por nome, código ou capital…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        width: '100%',
                        height: '48px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '0 44px 0 44px',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        style={{
                            position: 'absolute',
                            right: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            display: 'flex',
                            padding: '4px',
                        }}
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Results count */}
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {filtered.length === countries.length
                    ? `${countries.length} países`
                    : `${filtered.length} de ${countries.length} países`}
            </p>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</p>
                    <p style={{ fontSize: '16px' }}>Nenhum país encontrado para &ldquo;{query}&rdquo;</p>
                </div>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '16px',
                    }}
                >
                    {filtered.map((c, i) => (
                        <CountryCard key={c.code} country={c} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
