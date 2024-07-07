import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@prisma/prisma';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async () => {
  const session = await getSession();

  console.log('GET', session?.user);

  // const userModules = await prisma.user.findUniqueOrThrow({
  //   where: {
  //     email: session?.user.email
  //   },
  //   include: {
  //     CustomerForm: true
  //   }
  // });

  // const customerForms: CustomerForm[] = userModules.CustomerForm;

  return NextResponse.json([]);
});

export const POST = withApiAuthRequired(async request => {
  try {
    const session = await getSession();

    const body = await request.json();

    console.log('POST', session?.user);

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
