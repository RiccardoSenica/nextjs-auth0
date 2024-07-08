import { getSession } from '@auth0/nextjs-auth0';
import { CustomerForm } from '@prisma/client';
import prisma from '@prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession();

  try {
    const userCustomerForms = await prisma.user.findUniqueOrThrow({
      where: {
        email: session?.user.email
      },
      include: {
        CustomerForm: true
      }
    });

    const customerForms: CustomerForm[] = userCustomerForms.CustomerForm;

    return NextResponse.json({ success: true, data: customerForms });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    const body = await request.json();

    const newCustomerForm = await prisma.customerForm.create({
      data: {
        type: body.type,
        text: body.text,
        createdBy: {
          connect: {
            email: session?.user.email
          }
        }
      },
      select: {
        id: true,
        type: true,
        text: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ success: true, data: newCustomerForm });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
