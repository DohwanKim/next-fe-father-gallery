import queryString from 'query-string';

import { Paginate, PaginatePostsOptions } from '@/types/paginate.type';
import { CreatePostDTO, Post, UpdatePostDTO } from '@/types/posts.type';
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

export const createPost = async (
  id: number,
  data: CreatePostDTO,
): Promise<boolean> => {
  data.tags = [];

  return await apiFetch(`/api/posts/${id}`, {
    method: 'POST',
    body: data,
  }).then((res) => res.body as boolean);
};

export const updatePost = async (
  id: number,
  data: UpdatePostDTO,
): Promise<boolean> => {
  data.tags = [];

  return await apiFetch(`/api/posts/${id}`, {
    method: 'PATCH',
    body: data,
  }).then((res) => res.body as boolean);
};

export const deletePost = async (id: number): Promise<boolean> => {
  return await apiFetch(`/api/posts/${id}`, {
    method: 'DELETE',
  }).then((res) => res.body as boolean);
};
