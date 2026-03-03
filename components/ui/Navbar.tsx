'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, BarChart2, ArrowLeftRight } from 'lucide-react';

const links = [
    { href: '/', label: 'Países', icon: Globe },
    { href: '/comparador', label: 'Comparador', icon: ArrowLeftRight },
    { href: '/ranking', label: 'Ranking', icon: BarChart2 },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                height: '72px',
                background: 'rgba(7,9,15,0.85)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 32px',
            }}
        >
            {/* Logo */}
            <Link
                href="/"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    marginRight: '40px',
                    flexShrink: 0,
                }}
            >
                <span
                    style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        background: 'var(--gradient-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                    }}
                >
                    🌍
                </span>
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: '18px',
                        background: 'var(--gradient-accent)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.03em',
                    }}
                >
                    Global Insight
                </span>
            </Link>

            {/* Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {links.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                padding: '8px 16px',
                                borderRadius: '9px',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: active ? 600 : 400,
                                color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                background: active ? 'rgba(79,142,247,0.1)' : 'transparent',
                                border: active ? '1px solid rgba(79,142,247,0.2)' : '1px solid transparent',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <Icon size={15} />
                            {label}
                        </Link>
                    );
                })}
            </div>

            {/* Right side tag */}
            <span
                style={{
                    marginLeft: 'auto',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                }}
            >
                Dados IBGE
            </span>
        </nav>
    );
}
