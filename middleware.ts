import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const nickname = cookieStore.get('nickname');
  /* 
  if (accessToken && refreshToken && !nickname) {
    return NextResponse.redirect(new URL('/login/nickname', request.url));
  }

  if (accessToken && refreshToken && nickname) {
    return NextResponse.redirect(new URL('/', request.url));
  } */

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};
