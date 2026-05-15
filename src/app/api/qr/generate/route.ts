import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

/* ─────────────────────────────────────────────────────────────
   POST /api/qr/generate
   Body : { verifyUrl: string; token: string }
   Returns: { qrImageUrl: string }   ← base64 PNG data URL

   Generates a branded PNG QR code server-side using the
   `qrcode` npm library (no external API / keys required).
   Colors match DermaHome brand:
     modules  : #07070a (near-black)
     light    : #f8f8f6 (warm white)
───────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    const { verifyUrl, token } = (await request.json()) as {
      verifyUrl: string;
      token: string;
    };

    if (!verifyUrl || !token) {
      return NextResponse.json(
        { error: 'verifyUrl and token are required' },
        { status: 400 },
      );
    }

    /* Generate QR as PNG Buffer */
    const pngBuffer = await QRCode.toBuffer(verifyUrl, {
      type:            'png',
      width:           360,
      margin:          2,
      errorCorrectionLevel: 'M',
      color: {
        dark:  '#07070a',   // module (dot) colour
        light: '#f8f8f6',   // background colour
      },
    });

    const b64 = pngBuffer.toString('base64');
    const qrImageUrl = `data:image/png;base64,${b64}`;

    return NextResponse.json({ qrImageUrl, adjustShortUrl: verifyUrl });
  } catch (err) {
    console.error('QR generate route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
