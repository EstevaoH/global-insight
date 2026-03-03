export function Spinner({ size = 24 }: { size?: number }) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                border: `2px solid rgba(79,142,247,0.2)`,
                borderTopColor: 'var(--accent-blue)',
                animation: 'spin 0.8s linear infinite',
                flexShrink: 0,
            }}
        />
    );
}

export function SpinnerPage() {
    return (
        <div
            style={{
                minHeight: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <Spinner size={40} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Carregando...</p>
        </div>
    );
}
