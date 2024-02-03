import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const nickname = cookieStore.get('nickname');

  const url = request.nextUrl.clone();

  if (accessToken && refreshToken) {
    if (request.nextUrl.pathname.startsWith('/login')) {
      if (nickname && nickname.value) {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }

    if (!nickname || !nickname.value) {
      url.pathname = '/login/nickname';

      if (!request.url.includes('/login')) {
        return NextResponse.redirect(url);
      }
    }
  }

  const protectedRoutes = ['/register', '/content/register'];

  if (!accessToken || !refreshToken) {
    if (
      protectedRoutes.filter((value) =>
        request.nextUrl.pathname.includes(value),
      ).length !== 0
    ) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
