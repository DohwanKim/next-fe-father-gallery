import queryString from 'query-string';

import { Paginate, PaginatePostsOptions } from '@/types/paginate.type';
import { Post, PostCore } from '@/types/posts.type';
import apiFetch from '@/utils/fetchIntance';

export const getPaginatePosts = async (
  options: PaginatePostsOptions,
): Promise<Paginate<Post>> => {
  const query = queryString.stringify(options, {
    arrayFormat: 'comma',
    skipNull: true,
    skipEmptyString: true,
  });

  return await apiFetch(`/api/posts${query ? `?${query}` : ''}`).then(
    (res) => res.body as Paginate<Post>,
  );
};

export const getPost = async (id: number): Promise<Post> => {
  return await apiFetch(`/api/posts/${id}`).then((res) => res.body as Post);
};

export const getRandomPost = async (id: number): Promise<Post[]> => {
  return await apiFetch(`/api/posts/random-post`)
    .then((res) => res.body as Post[])
    .then((res) => res.filter((post) => post.id !== id).slice(0, 3));
};

export const createPost = async (data: PostCore): Promise<boolean> => {
  return await apiFetch(`/api/posts`, {
    method: 'POST',
    body: data,
  }).then((res) => res.body as boolean);
};

export const updatePost = async (
  id: number,
  data: PostCore,
): Promise<boolean> => {
  return await apiFetch(`/api/posts/${id}`, {
    method: 'PATCH',
    body: data,
  }).then((res) => res.body as boolean);
};

export const deletePost = async (id: number | number[]): Promise<boolean> => {
  const data = Array.isArray(id) ? id : [id];

  return await apiFetch(`/api/posts/${data}`, {
    method: 'DELETE',
  }).then((res) => res.body as boolean);
};
