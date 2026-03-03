import { ibgeService } from '@/services/ibge.service';
import { CountrySearchGrid } from '@/components/country/CountrySearch';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const countries = await ibgeService.getAllCountries();
  // Ordena alfabeticamente por nome PT
  const sorted = [...countries].sort((a, b) => a.name.localeCompare(b.name, 'pt'));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section
        className="dot-pattern"
        style={{
          padding: '80px 32px 64px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(79,142,247,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            marginBottom: '16px',
          }}
        >
          Plataforma Acadêmica · Fonte: IBGE
        </p>

        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 800,
            margin: '0 auto 16px',
            maxWidth: '700px',
            lineHeight: 1.15,
          }}
        >
          Análise{' '}
          <span
            style={{
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Comparativa
          </span>{' '}
          de Países
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
        >
          Explore indicadores socioeconômicos de{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{sorted.length} países</strong> com
          dados oficiais do IBGE. Compare, analise tendências e gere insights automáticos.
        </p>

        {/* Stat pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: `${sorted.length} Países`, icon: '🌍' },
            { label: '34 Indicadores', icon: '📊' },
            { label: 'Série histórica', icon: '📈' },
            { label: 'Insights automáticos', icon: '🧠' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 18px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '99px',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}
            >
              <span>{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>
      </section>

      {/* Countries grid */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px 80px' }}>
        <CountrySearchGrid countries={sorted} />
      </section>
    </div>
  );
}
