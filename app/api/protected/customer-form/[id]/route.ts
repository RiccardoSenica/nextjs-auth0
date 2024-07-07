import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { CustomerFormType } from '@prisma/client';
import prisma from '@prisma/prisma';
import { createErrorResponse } from '@utils/createErrorResponse';
import { CustomerForm } from '@utils/types';
import { validateContext } from '@utils/validateContext';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async (request, context) => {
  const session = await getSession();

  let id;

  try {
    id = validateContext(context);
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }

  const userEmail = session?.user?.email;

  if (!userEmail) {
    return createErrorResponse('Session not found or invalid', 401);
  }

  try {
    const customerForm = await prisma.customerForm.findUnique({
      where: {
        id,
        createdBy: { email: userEmail }
      }
    });

    if (!customerForm) {
      return createErrorResponse('Customer form not found', 404);
    }

    return NextResponse.json({ success: true, data: customerForm });
  } catch (error) {
    console.error('Error fetching customer form:', error);
    return createErrorResponse('Internal server error', 500);
  }
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

export const DELETE = withApiAuthRequired(async (request, context) => {
  const session = await getSession();

  let id;

  try {
    id = validateContext(context);
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }

  const result = await prisma.customerForm.delete({
    where: {
      id: id,
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
});
