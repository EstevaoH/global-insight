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
        <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#07090f]/85 backdrop-blur-md border-b border-white/10 flex items-center px-8">
            {/* Logo */}
            <Link
                href="/"
                className="flex items-center gap-2.5 no-underline mr-10 shrink-0"
            >
                <span className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#4f8ef7] to-[#6366f1] flex items-center justify-center text-lg">
                    🌍
                </span>
                <span className="font-bold text-lg bg-gradient-to-br from-[#4f8ef7] to-[#6366f1] text-transparent bg-clip-text tracking-[-0.03em]">
                    Global Insight
                </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
                {links.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-[9px] no-underline text-sm transition-all duration-200 ${active
                                    ? 'font-semibold text-[#4f8ef7] bg-[#4f8ef7]/10 border border-[#4f8ef7]/20'
                                    : 'font-normal text-[#8b96b0] bg-transparent border border-transparent hover:bg-white/5'
                                }`}
                        >
                            <Icon size={15} />
                            {label}
                        </Link>
                    );
                })}
            </div>

            {/* Right side tag */}
            <span className="ml-auto text-[11px] text-[#4a5568] font-medium tracking-[0.08em] uppercase">
                Dados IBGE
            </span>
        </nav>
    );
}
