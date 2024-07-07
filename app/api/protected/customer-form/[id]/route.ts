import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { CustomerFormType } from '@prisma/client';
import prisma from '@prisma/prisma';
import { CustomerForm } from '@utils/types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async request => {
  const session = await getSession();

  const x = console.log('request', request);

  const result = await prisma.customerForm.findUnique({
    where: {
      id: 'params.id',
      createdBy: {
        email: session?.user.email
      }
    }
  });

  if (!result) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: [] });
});

export async function PUT(
  request: NextRequest,
  { params }: { params: CustomerForm }
) {
  const session = await getSession();

  const result = await prisma.customerForm.update({
    where: {
      id: params.id,
      createdBy: {
        email: session?.user.email
      }
    },
    data: {
      type: params.type as CustomerFormType,
      text: params.text
    }
  });

  if (!result) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: result });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  const result = await prisma.customerForm.delete({
    where: {
      id: params.id,
      createdBy: {
        email: session?.user.email
      }
    }
  });

  if (!result) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
