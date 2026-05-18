import { NextRequest, NextResponse } from 'next/server';
import { consumeToken } from '../store';

/* POST /api/qr/consume
   Body: { token: string }
   Marks a token as used (one-time).
   Called when a customer scans the QR code. */

export async function POST(request: NextRequest) {
  try {
    const { token } = (await request.json()) as { token: string };

    if (!token) {
      return NextResponse.json({ error: 'token required' }, { status: 400 });
    }

    const result = consumeToken(token);

    if (result.ok) {
      return NextResponse.json({ success: true, message: '인증 완료' });
    }

    const messages: Record<string, string> = {
      used: '이미 사용된 QR 코드입니다.',
      expired: '만료된 QR 코드입니다.',
      invalid: '유효하지 않은 QR 코드입니다.',
    };

    return NextResponse.json(
      { success: false, reason: result.reason, message: messages[result.reason!] || '알 수 없는 오류' },
      { status: 400 },
    );
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
