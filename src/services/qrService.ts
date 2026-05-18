/* ─── QR Service ─────────────────────────────────────────────
   All QR operations now go through server-side API routes:
     POST /api/qr/generate  — create QR + register token
     POST /api/qr/consume   — mark token as used (one-time)
     GET  /api/qr/status     — poll token status

   No Firebase dependency required.
────────────────────────────────────────────────────────────── */

/** 5-second fetch timeout wrapper */
async function fetchWithTimeout(url: string, init: RequestInit, ms = 5000): Promise<Response> {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(tid);
    return res;
  } catch (e) {
    clearTimeout(tid);
    throw e;
  }
}

/* ── Generate a new QR session ── */
export async function createStoreSession(
  _storeId = 'default',
  prevToken?: string,
): Promise<{
  token: string;
  qrImageUrl: string;
  verifyUrl: string;
  expiredAt: string;
}> {
  const rand = Math.random().toString(36).substring(2, 11).toUpperCase();
  const token = `UC${Date.now()}${rand}`;

  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://dermahome.unincore.com';

  const verifyUrl = `${baseUrl}/verify?code=${token}`;

  /* Call server-side QR generation + token registration */
  const res = await fetchWithTimeout(
    '/api/qr/generate',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verifyUrl, token, prevToken }),
    },
    8000,
  );

  if (!res.ok) {
    throw new Error(`QR API error: ${res.status}`);
  }

  const data = (await res.json()) as {
    qrImageUrl: string;
    token: string;
    expiredAt: string;
  };

  return {
    token: data.token,
    qrImageUrl: data.qrImageUrl,
    verifyUrl,
    expiredAt: data.expiredAt,
  };
}

/* ── Check token status (for polling) ── */
export async function getQRStatus(
  token: string,
): Promise<{ status: 'unused' | 'used' | 'expired' | 'invalid' } | null> {
  try {
    const res = await fetchWithTimeout(
      `/api/qr/status?token=${encodeURIComponent(token)}`,
      { method: 'GET' },
      5000,
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/* ── Consume token (customer scans QR) ── */
export async function consumeQR(
  token: string,
): Promise<{ success: boolean; reason?: string; message?: string }> {
  try {
    const res = await fetchWithTimeout(
      '/api/qr/consume',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      },
      5000,
    );
    return await res.json();
  } catch {
    return { success: false, reason: 'network', message: '네트워크 오류가 발생했습니다.' };
  }
}
