import { NextRequest, NextResponse } from 'next/server';

/* ─────────────────────────────────────────────────────────────
   POST /api/qr/generate
   Body: { verifyUrl: string; token: string }
   Returns: { qrImageUrl: string; adjustShortUrl: string }

   If ADJUST_API_TOKEN + ADJUST_LINK_TOKEN are set, uses the
   Adjust QR Code Stream API (https://automate.adjust.com).
   Otherwise falls back to api.qrserver.com.
───────────────────────────────────────────────────────────── */

const ADJUST_API_TOKEN  = process.env.ADJUST_API_TOKEN;
const ADJUST_LINK_TOKEN = process.env.ADJUST_LINK_TOKEN;
const BASE_URL          = process.env.NEXT_PUBLIC_BASE_URL || 'https://dermahome.unincore.com';

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

    /* ── Attempt Adjust API ───────────────────────────────── */
    if (ADJUST_API_TOKEN && ADJUST_LINK_TOKEN) {
      try {
        const adjustRes = await fetch(
          'https://automate.adjust.com/engage/qr-code/stream',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ADJUST_API_TOKEN}`,
            },
            body: JSON.stringify({
              data: {
                link_token:    ADJUST_LINK_TOKEN,
                redirect:      verifyUrl,
                fallback:      verifyUrl,
                campaign:      'store-qr-session',
                label:         token,
                shorten_url:   true,
              },
              qr_code_params: {
                file_type:        'png',
                error_correction: 'medium',
                box_size:         10,
                border:           4,
                fill_color:       '#07070a',
                back_color:       '#f8f8f6',
                fit:              true,
                logo_url:         `${BASE_URL}/images/logo_vertical.png`,
                logo_scale:       0.20,
              },
            }),
          },
        );

        if (adjustRes.ok) {
          /* Adjust short link embedded in the QR (from response header) */
          const adjustShortUrl =
            adjustRes.headers.get('X-QR-Code-URL') ?? verifyUrl;

          /* Binary PNG stream → base64 data URL */
          const buf    = await adjustRes.arrayBuffer();
          const b64    = Buffer.from(buf).toString('base64');
          const qrImageUrl = `data:image/png;base64,${b64}`;

          return NextResponse.json({ qrImageUrl, adjustShortUrl });
        }

        /* Non-2xx from Adjust → log and fall through */
        const errText = await adjustRes.text();
        console.error(`Adjust API ${adjustRes.status}: ${errText}`);
      } catch (adjustErr) {
        console.error('Adjust API fetch failed:', adjustErr);
      }
    }

    /* ── Fallback: api.qrserver.com ──────────────────────── */
    const qrImageUrl = [
      'https://api.qrserver.com/v1/create-qr-code/',
      `?size=300x300`,
      `&data=${encodeURIComponent(verifyUrl)}`,
      `&format=png`,
      `&margin=12`,
      `&color=07070a`,
      `&bgcolor=f8f8f6`,
    ].join('');

    return NextResponse.json({ qrImageUrl, adjustShortUrl: verifyUrl });
  } catch (err) {
    console.error('QR generate route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
