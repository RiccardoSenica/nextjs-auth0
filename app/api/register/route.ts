import prisma from '@prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  if (token !== process.env.AUTH0_API_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
};
