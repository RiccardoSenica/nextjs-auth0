import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@prisma/prisma';
import { createErrorResponse } from '@utils/createErrorResponse';
import { validateApiRequestContext } from '@utils/validateApiRequestContext';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async (_, context) => {
  const session = await getSession();

  let params;

  try {
    params = validateApiRequestContext(context);
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
        id: params.id,
        createdBy: { email: userEmail }
      },
      select: {
        id: true,
        type: true,
        text: true,
        createdAt: true,
        updatedAt: true
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

export const DELETE = withApiAuthRequired(async (_, context) => {
  const session = await getSession();

  let params;

  try {
    params = validateApiRequestContext(context);
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }

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
});
