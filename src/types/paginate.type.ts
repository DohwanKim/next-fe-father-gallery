import { ArtType } from '@/constants/post.enum';

export type Paginate<T> = {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
};

export type PaginatePostsOptions = {
  page?: number;
  limit?: number;
  title?: string;
  sort?: 'DESC' | 'ASC';
  tags?: string[];
  artTypes?: ArtType[];
};
