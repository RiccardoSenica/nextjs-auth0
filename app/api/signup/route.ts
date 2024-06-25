import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          email
        }
      });
      return res.status(200).json(user);
    } catch (error) {
      console.error('Failed to create user:', error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
