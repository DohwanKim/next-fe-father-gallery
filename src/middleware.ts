import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/server/web/spec-extension/cookies';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}`;
let newResponse: Response;

function applySetCookie(req: NextRequest, res: NextResponse): void {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers);
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  // set “request header overrides” on the outgoing response
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

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const sid = request.cookies.get('sid')?.value;
  if (!sid) {
    const id = crypto.randomUUID();
    const response = NextResponse.redirect(request.url);
    applySetCookie(request, res);
    response.cookies.set('sid', id);
    return response;
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
