import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { CustomerForm } from '@prisma/client';
import prisma from '@prisma/prisma';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async () => {
  const session = await getSession();

  try {
    const userModules = await prisma.user.findUniqueOrThrow({
      where: {
        email: session?.user.email
      },
      include: {
        CustomerForm: true
      }
    });

    const customerForms: CustomerForm[] = userModules.CustomerForm;

    return NextResponse.json({ success: true, data: customerForms });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
});

export const POST = withApiAuthRequired(async request => {
  try {
    const session = await getSession();

    const body = await request.json();

    const newCustomerForm = await prisma.customerForm.create({
      data: {
        type: body.type,
        text: body.text,
        createdBy: {
          connect: {
            id: randomUUID(),
            email: session?.user.email
          }
        }
      }
    });

    return NextResponse.json({ success: true, data: newCustomerForm });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
});
