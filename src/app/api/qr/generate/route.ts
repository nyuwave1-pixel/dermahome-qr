import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { registerToken, invalidateToken } from '../store';

/* ─────────────────────────────────────────────────────────────
   POST /api/qr/generate
   Body : { verifyUrl: string; token: string; prevToken?: string }
   Returns: { qrImageUrl: string; token: string; expiredAt: string }

   Generates a branded PNG QR code server-side using the
   `qrcode` npm library. Registers the token in the server-side
   store for one-time use enforcement.

   If prevToken is provided, it is immediately invalidated
   (prevents reuse of previously generated QR).
───────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    const { verifyUrl, token, prevToken } = (await request.json()) as {
      verifyUrl: string;
      token: string;
      prevToken?: string;
    };

    if (!verifyUrl || !token) {
      return NextResponse.json(
        { error: 'verifyUrl and token are required' },
        { status: 400 },
      );
    }

    // Invalidate previous token if provided
    if (prevToken) {
      invalidateToken(prevToken);
    }

    // Register new token in server-side store (8h TTL)
    const record = registerToken(token, 8 * 60 * 60 * 1000);

    // Generate QR as PNG Buffer
    const pngBuffer = await QRCode.toBuffer(verifyUrl, {
      type: 'png',
      width: 360,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#07070a',
        light: '#f8f8f6',
      },
    });

    const b64 = pngBuffer.toString('base64');
    const qrImageUrl = `data:image/png;base64,${b64}`;

    return NextResponse.json({
      qrImageUrl,
      token: record.token,
      expiredAt: new Date(record.expiredAt).toISOString(),
    });
  } catch (err) {
    console.error('QR generate route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
