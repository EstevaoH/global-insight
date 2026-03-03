export function Spinner({ size = 24 }: { size?: number }) {
    return (
        <div
            className="rounded-full border-2 border-[#4f8ef7]/20 border-t-[#4f8ef7] animate-spin shrink-0"
            style={{ width: size, height: size }}
        />
    );
}

export function SpinnerPage() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center flex-col gap-4">
            <Spinner size={40} />
            <p className="text-[#8b96b0] text-sm">Carregando...</p>
        </div>
    );
}
