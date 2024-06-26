import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  const session = await getSession();

  console.log('Session', session);

  const body = await request.json();
  console.log('request', request, 'body', body);

  const { email } = await request.json();

  if (email) {
    await prisma.user.upsert({
      create: {
        email
      },
      update: {
        updatedAt: new Date()
      },
      where: {
        deleted: false,
        email
      }
    });
  }

  return NextResponse.json({ message: email });
});
