'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { ProfileSchema } from '@utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, error, isLoading } = useUser();

  const [profile, setProfile] = useState('');

  useEffect(() => {
    (async () => {
      if (!user) return;

      const response = await axios.get('/api/protected/profile');

      const validatedResponse = ProfileSchema.safeParse(response.data.data);

      if (!validatedResponse.success) {
        console.error(validatedResponse.error);
        return;
      }

      setProfile(validatedResponse.data.email);
    })();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='mb-8 text-center text-4xl font-bold'>
        Next.js + Auth0 Starter
      </h1>
      <nav className='text-center'>
        {!user && (
          <a
            href='/api/auth/login'
            className='inline-block rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
          >
            Login
          </a>
        )}
        {user && (
          <>
            <div className='mb-6'>
              <p className='text-lg'>
                <strong>Logged in as:</strong>{' '}
                {user.name || user.email || 'User'}
              </p>
            </div>
            <div className='space-x-4'>
              <a
                href='/customer-form'
                className='inline-block rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
              >
                Forms
              </a>
              <a
                href='/api/auth/logout'
                className='inline-block rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600'
              >
                Logout
              </a>
            </div>
          </>
        )}
      </nav>
    </main>
  );
}
