import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}`;

const getLoggedInfo = async (headers: Headers) => {
  let newResponse = null;
  let isLogged = false;

  // 아래의 과정에서 예측하지 못한 에러를 대비하여 try-catch 랩핑
  try {
    const { id, username, role, message } = await fetch(
      `${BASE_URL}/users/info`,
      {
        method: 'GET',
        headers,
        credentials: 'include',
      },
    ).then((res) => res.json());

    if (id && username && role === 'ADMIN') {
      isLogged = true;
    }
    if (message === 'JWT_ACCESS_TOKEN_UNAUTHORIZED') {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });
      const isHasGetSetCookie = res.headers.getSetCookie().length > 0;

      if (isHasGetSetCookie) {
        newResponse = NextResponse.next({
          headers: res.headers,
        });
        isLogged = true;
      }
    }
  } catch (e) {
    // 인증 관련 에러 logging 삽입 부분
    console.error(e);
  }

  return { isLogged, newResponse };
};

export async function middleware(request: NextRequest) {
  const { headers } = request;
  const { pathname, origin } = request.nextUrl;
  const { isLogged, newResponse } = await getLoggedInfo(headers);

  // 로그아웃 되어 있는데 어드민 관리 페이지로 왔을때
  if (pathname !== '/admin' && pathname !== '/admin/signout' && !isLogged) {
    return NextResponse.redirect(new URL('/admin', origin));
  }

  // 로그인 되어 있는데 로그인 페이지로 왔을때
  if (pathname === '/admin' && isLogged) {
    return NextResponse.redirect(new URL('/admin/posts', origin));
  }

  if (newResponse) {
    return newResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
