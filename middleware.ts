import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

export default withMiddlewareAuthRequired({
  async middleware() {
    const res = NextResponse.next();
    return res;
  },
  returnTo: '/api/auth/login'
});

export const config = {
  matcher: ['/api/protected/:path*', '/customer-form/:path*']
};
