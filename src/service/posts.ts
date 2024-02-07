import { Paginate } from '@/types/paginate.type';
import {
  ArtType,
  CreatePostDTO,
  Post,
  UpdatePostDTO,
} from '@/types/posts.type';
import apiFetch from '@/utils/ofetchIntance';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface GetPaginatePostsInterface {
  page?: number;
  limit?: number;
  title?: string;
  sort?: 'DESC' | 'ASC';
  tags?: string[];
  artTypes?: ArtType[];
}

export const getPaginatePosts = async ({
  page = 1,
  limit,
  title,
  sort,
  tags,
  artTypes,
}: GetPaginatePostsInterface): Promise<Paginate<Post>> => {
  return await apiFetch(`${BASE_URL}/posts`, {
    query: { page, limit, title, sort, tags, artTypes },
  });
};

export const getPost = async (id: number): Promise<Post> => {
  return await apiFetch(`${BASE_URL}/posts/${id}`);
};

export const createPost = async (
  id: number,
  data: CreatePostDTO,
): Promise<boolean> => {
  return await apiFetch(`${BASE_URL}/posts/${id}`, {
    method: 'POST',
    body: data,
  });
};

export const updatePost = async (
  id: number,
  data: UpdatePostDTO,
): Promise<boolean> => {
  return await apiFetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: data,
  });
};

export const deletePost = async (id: number): Promise<boolean> => {
  return await apiFetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
};
