import { NextResponse } from 'next/server';

import { getSession } from '@auth0/nextjs-auth0';

export async function GET() {
  const session = await getSession();

  return NextResponse.json({
    success: true,
    data: { email: session?.user.email }
  });
}
