import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '../store';

/* GET /api/qr/status?token=xxx
   Returns current token status for polling (매장 화면) */

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'token required' }, { status: 400 });
  }

  const rec = getToken(token);
  if (!rec) {
    return NextResponse.json({ status: 'invalid' });
  }

  return NextResponse.json({
    status: rec.status,
    createdAt: new Date(rec.createdAt).toISOString(),
    expiredAt: new Date(rec.expiredAt).toISOString(),
    usedAt: rec.usedAt ? new Date(rec.usedAt).toISOString() : null,
  });
}
