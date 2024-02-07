import { FetchContext, FetchResponse, ofetch } from 'ofetch';
import { ResponseType } from 'undici-types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiFetch = ofetch.create({
  baseURL: BASE_URL,
  headers: {},
  onRequest({ request, options }: FetchContext): Promise<void> | void {
    console.log(request, options);
  },
  onRequestError({
    request,
    options,
    error,
  }: FetchContext & { error: Error }): Promise<void> | void {
    console.log(request, options, error);
  },
  onResponse({
    request,
    response,
    options,
  }: FetchContext): Promise<void> | void {
    console.log(request, response, options);
  },
  onResponseError({
    request,
    response,
    options,
  }: FetchContext & {
    response: FetchResponse<ResponseType>;
  }): Promise<void> | void {
    console.log(request, response, options);
  },
});

export default apiFetch;
