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
        <div style={{ position: 'relative' }} id={id}>
            {/* Trigger */}
            <button
                onClick={() => setOpen((o) => !o)}
                style={{
                    width: '100%',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '0 16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    color: value ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontSize: '15px',
                    fontWeight: value ? 500 : 400,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                }}
            >
                {value ? (
                    <>
                        <div style={{ width: '32px', height: '22px', borderRadius: '4px', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '1px solid var(--border)' }}>
                            <Image src={`https://flagcdn.com/w80/${value.code.toLowerCase()}.png`} alt="" fill style={{ objectFit: 'cover' }} sizes="32px" />
                        </div>
                        {value.name}
                        <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{value.code}</span>
                    </>
                ) : (
                    <>
                        <Search size={16} style={{ flexShrink: 0 }} />
                        {placeholder}
                    </>
                )}
                <ChevronDown size={15} style={{ marginLeft: value ? '0' : 'auto', color: 'var(--text-muted)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {/* Clear */}
            {value && (
                <button
                    onClick={(e) => { e.stopPropagation(); onChange(null); }}
                    style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: '4px' }}
                >
                    <X size={14} />
                </button>
            )}

            {/* Dropdown */}
            {open && (
                <div
                    style={{
                        position: 'absolute',
                        top: '56px',
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        background: '#0d1117',
                        border: '1px solid var(--border)',
                        borderRadius: '14px',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                        overflow: 'hidden',
                    }}
                >
                    {/* Search */}
                    <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Buscar…"
                                style={{
                                    width: '100%',
                                    height: '36px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    padding: '0 10px 0 30px',
                                    color: 'var(--text-primary)',
                                    fontSize: '13px',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                }}
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                        {filtered.length === 0 ? (
                            <p style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>Sem resultados</p>
                        ) : (
                            filtered.map((c) => (
                                <button
                                    key={c.code}
                                    onClick={() => select(c)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '10px 14px',
                                        background: value?.code === c.code ? 'rgba(79,142,247,0.1)' : 'transparent',
                                        border: 'none',
                                        color: 'var(--text-primary)',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        transition: 'background 0.15s',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = value?.code === c.code ? 'rgba(79,142,247,0.1)' : 'transparent')}
                                >
                                    <div style={{ width: '28px', height: '20px', borderRadius: '3px', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '1px solid var(--border)' }}>
                                        <Image src={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png`} alt="" fill style={{ objectFit: 'cover' }} sizes="28px" />
                                    </div>
                                    <span style={{ flex: 1 }}>{c.name}</span>
                                    <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text-muted)' }}>{c.code}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
