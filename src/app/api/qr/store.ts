/* ─── Server-side in-memory token store ─────────────────────
   Tracks QR session tokens and their lifecycle:
     unused → used → (auto-purged after 24 h)

   Works without Firebase. If Firestore is configured,
   createStoreSession will also persist there as a backup.
   This store is the *source of truth* for one-time enforcement.
────────────────────────────────────────────────────────────── */

export interface TokenRecord {
  token: string;
  status: 'unused' | 'used' | 'expired';
  createdAt: number;   // Date.now()
  expiredAt: number;   // Date.now() + TTL
  usedAt?: number;
}

const tokens = new Map<string, TokenRecord>();

/* Auto-purge tokens older than 24 h every 10 min */
const PURGE_INTERVAL = 10 * 60 * 1000;
const MAX_AGE = 24 * 60 * 60 * 1000;

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const cutoff = Date.now() - MAX_AGE;
    for (const [key, rec] of tokens) {
      if (rec.createdAt < cutoff) tokens.delete(key);
    }
  }, PURGE_INTERVAL);
}

/* ── Public API ── */

export function registerToken(token: string, ttlMs = 8 * 60 * 60 * 1000): TokenRecord {
  const now = Date.now();
  const record: TokenRecord = {
    token,
    status: 'unused',
    createdAt: now,
    expiredAt: now + ttlMs,
  };
  tokens.set(token, record);
  return record;
}

export function getToken(token: string): TokenRecord | null {
  const rec = tokens.get(token);
  if (!rec) return null;

  // Auto-expire if past TTL
  if (rec.status === 'unused' && Date.now() > rec.expiredAt) {
    rec.status = 'expired';
    tokens.set(token, rec);
  }
  return rec;
}

export function consumeToken(token: string): { ok: boolean; reason?: string } {
  const rec = tokens.get(token);

  if (!rec) return { ok: false, reason: 'invalid' };
  if (rec.status === 'used') return { ok: false, reason: 'used' };
  if (rec.status === 'expired' || Date.now() > rec.expiredAt) {
    rec.status = 'expired';
    tokens.set(token, rec);
    return { ok: false, reason: 'expired' };
  }

  // Mark as used — one-time enforcement
  rec.status = 'used';
  rec.usedAt = Date.now();
  tokens.set(token, rec);
  return { ok: true };
}

export function invalidateToken(token: string): void {
  const rec = tokens.get(token);
  if (rec) {
    rec.status = 'expired';
    tokens.set(token, rec);
  }
}
