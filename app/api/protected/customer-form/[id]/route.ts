import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@prisma/prisma';
import { createErrorResponse } from '@utils/createErrorResponse';
import { validateApiRequestContext } from '@utils/validateApiRequestContext';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || !session.user) {
    return createErrorResponse('Unauthorized', 401);
  }

  let params;
  try {
    params = validateApiRequestContext(context);
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }

  const userEmail = session.user.email;
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
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || !session.user) {
    return createErrorResponse('Unauthorized', 401);
  }

  let params;
  try {
    params = validateApiRequestContext(context);
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }

  try {
    const result = await prisma.customerForm.delete({
      where: {
        id: params.id,
        createdBy: {
          email: session.user.email
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
  } catch (error) {
    console.error('Error deleting customer form:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
