/**
 * Cache Service — Global Insight
 *
 * Cache simples em memória (Map) com TTL por entrada.
 * Usado pelo IbgeService para evitar chamadas redundantes à API.
 */

interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

class CacheService {
    private store = new Map<string, CacheEntry<unknown>>();

    /** TTL padrão: 10 minutos */
    private defaultTtlMs = 10 * 60 * 1000;

    set<T>(key: string, data: T, ttlMs?: number): void {
        this.store.set(key, {
            data,
            expiresAt: Date.now() + (ttlMs ?? this.defaultTtlMs),
        });
    }

    get<T>(key: string): T | null {
        const entry = this.store.get(key) as CacheEntry<T> | undefined;
        if (!entry) return null;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return entry.data;
    }

    has(key: string): boolean {
        return this.get(key) !== null;
    }

    invalidate(key: string): void {
        this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }
}

/** Instância singleton compartilhada entre os serviços. */
export const cacheService = new CacheService();
