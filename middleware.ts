import { reissueToken } from '@/apis/login';
import { accessTime } from '@/constants/tokenExpires';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const nickname = cookieStore.get('nickname');

  const url = request.nextUrl.clone();

  if (refreshToken) {
    // 토큰이 있을 경우 로그인 페이지 접근 제한
    if (request.nextUrl.pathname.startsWith('/login')) {
      // 닉네임이 있는 유저일 경우 홈으로 이동
      if (nickname) return NextResponse.redirect(url.origin);

      // 닉네임이 없는 유저일 경우 nickname 설정 페이지로 이동
      if (!nickname) {
        url.pathname = '/login/nickname';
        return NextResponse.redirect(url.pathname);
      }
    }
  }

  if (!accessToken && !refreshToken) {
    // 토큰 없이 로그인 페이지 외 페이지 접근 시 로그인으로 이동
    if (!request.nextUrl.pathname.startsWith('/login')) {
      // auth 페이지는 제외
      if (request.nextUrl.pathname.startsWith('/auth'))
        return NextResponse.next();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
