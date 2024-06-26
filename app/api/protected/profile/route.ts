import { NextResponse } from 'next/server';

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async () => {
  const session = await getSession();

  return NextResponse.json(session?.user);
});
