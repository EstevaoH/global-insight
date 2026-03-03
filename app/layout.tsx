import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global Insight — Análise Comparativa de Países",
  description:
    "Plataforma académica para análise comparativa de indicadores socioeconômicos entre países, com dados oficiais do IBGE.",
  keywords: ["países", "indicadores", "IBGE", "análise", "comparação", "educação", "saúde"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <Navbar />
        <main style={{ paddingTop: "72px" }}>{children}</main>
      </body>
    </html>
  );
}
