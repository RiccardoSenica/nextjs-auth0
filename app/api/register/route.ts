import prisma from '@prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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
}
