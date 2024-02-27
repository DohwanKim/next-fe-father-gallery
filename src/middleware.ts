import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}`;
let newResponse: Response;

const isUserLogged = async (headers: Headers) => {
  let isLogged = false;

  console.log('cookie:', headers.get('cookie'));

  await fetch(`${BASE_URL}/users/info`, {
    method: 'GET',
    headers,
    credentials: 'include',
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.id && data.username && data.role === 'ADMIN') {
        isLogged = true;
      }
      if (data.message === 'JWT_ACCESS_TOKEN_UNAUTHORIZED') {
        await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'GET',
          headers,
          credentials: 'include',
        }).then((res) => {
          const isHasGetSetCookie = res.headers.getSetCookie().length > 0;

          if (isHasGetSetCookie) {
            newResponse = NextResponse.next({
              headers: res.headers,
            });
            isLogged = true;
          } else {
            throw new Error('failed to refresh token');
          }
        });
      }
    })
    .catch(async () => {
      try {
        await fetch(`${BASE_URL}/auth/signout`, {
          method: 'POST',
          headers,
          credentials: 'include',
        });
      } catch (e) {
        console.error(e);
      } finally {
        const requestHeaders = new Headers(headers);

        newResponse = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
        newResponse.headers.set(
          'Set-Cookie',
          'accessToken=; expires = Thu, 01 Jan 1970 00:00:00 GMT, refreshToken=; expires = Thu, 01 Jan 1970 00:00:00 GMT',
        );
      }
    });

  return isLogged;
};

function applySetCookie(req: NextRequest, res: NextResponse): void {
  const resCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);

  resCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}

export async function middleware(request: NextRequest) {
  const code = request.cookies.get('code')?.value;

  if (!code) {
    const res = NextResponse.redirect(request.url);
    res.cookies.set('code', 'code value');
    applySetCookie(request, res);
    return res;
  }

  const { headers } = request;
  const { pathname, origin } = request.nextUrl;
  const isLogged = await isUserLogged(headers);

  if (pathname !== '/admin' && !isLogged) {
    return NextResponse.redirect(new URL('/admin', origin));
  }

  if (pathname === '/admin' && isLogged) {
    return NextResponse.redirect(new URL('/admin/posts', origin));
  }

  if (newResponse) {
    return newResponse;
  }
}

export const config = {
  matcher: '/admin/:path*',
};
