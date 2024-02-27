import returnFetch, {
  FetchArgs,
  ReturnFetchDefaultOptions,
} from 'return-fetch';

import { ErrorMessages } from '@/constants/error-messages.enum';
import { refreshToken, signOut } from '@/service/auth';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}`;

type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & {
  body?: object;
};

export type ResponseGenericBody<T> = Omit<
  Awaited<ReturnType<typeof fetch>>,
  keyof Body | 'clone'
> & {
  body: T;
};

export type JsonResponse<T> = T extends object
  ? ResponseGenericBody<T>
  : ResponseGenericBody<unknown>;

export const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async <T>(
    url: FetchArgs[0],
    init?: JsonRequestInit,
  ): Promise<JsonResponse<T>> => {
    const response = await fetch(url, {
      ...init,
      credentials: 'include',
      body: init?.body && JSON.stringify(init.body),
    });
    const body = parseJsonSafely(await response.text()) as T;

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body,
    } as JsonResponse<T>;
  };
};

const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') {
      throw e;
    }

    return text.trim();
  }
};

// headers: [
//   { key: 'Access-Control-Allow-Credentials', value: 'true' },
//   { key: 'Access-Control-Allow-Origin', value: '*' },
//   {
//     key: 'Access-Control-Allow-Methods',
//     value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//   },
//   {
//     key: 'Access-Control-Allow-Headers',
//     value:
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//   },
// ],

const apiFetch = returnFetchJson({
  baseUrl: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    credentials: 'include',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  },
  interceptors: {
    request: async (request) => {
      return request;
    },
    response: async (response, requestArgs) => {
      if (!response.ok && response.status === 401) {
        const message = JSON.parse(await response.clone().text()).message;

        if (message === ErrorMessages.JWT_ACCESS_TOKEN_UNAUTHORIZED) {
          try {
            await refreshToken();
          } catch (err) {
            await signOut().finally(() => (window.location.href = '/admin'));
            throw new Error('로그인 페이지로 이동');
          }
          return await fetch(...requestArgs);
        }

        if (message === ErrorMessages.JWT_REFRESH_TOKEN_UNAUTHORIZED) {
          try {
            await signOut();
          } finally {
            console.log('리플래시 토큰 만료 시점. 로그인 페이지로 이동');
            window.location.href = '/admin';
          }
        }

        if (message === ErrorMessages.JWT_REFRESH_TOKEN_INVALID) {
          window.location.href = '/admin';
        }

        if (
          message === ErrorMessages.INVALID_PASSWORD ||
          message === ErrorMessages.INVALID_ID
        ) {
          throw new Error(message);
        }
      }

      return response;
    },
  },
});

export default apiFetch;
