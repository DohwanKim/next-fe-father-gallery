'use client';

import { QueryClient, useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import PostTable from '@/components/admin/organism/PostTable';
import { getPaginatePosts } from '@/service/posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

import BasicPagination from '../BasicPagination';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const Posts = () => {
  const [pageQuery, setPageQuery] = useQueryState('page');
  const [limitQuery] = useQueryState('limit');
  const { data } = useQuery<Paginate<Post>>(
    {
      queryKey: ['posts', pageQuery],
      queryFn: () => {
        return getPaginatePosts({
          page: Number(pageQuery || 1),
          limit: Number(limitQuery || 10),
        });
      },
      placeholderData: (previousData) => previousData,
    },
    queryClient,
  );

  return (
    <div className={'flex flex-col gap-5'}>
      <PostTable
        items={data?.items || []}
        totalItems={data?.meta.totalItems || 0}
        currentPage={data?.meta.currentPage || 1}
        itemsPerPage={data?.meta.itemsPerPage || 10}
      />
      <BasicPagination
        totalItems={data?.meta.totalItems || 0}
        totalPages={data?.meta.totalPages || 0}
        currentPage={data?.meta.currentPage || 1}
        itemsPerPage={data?.meta.itemsPerPage || 10}
        pageNumbersCount={limitQuery ? Number(limitQuery) : 10}
        onChangePage={async (page) => {
          await setPageQuery(`${page}`);
        }}
      />
    </div>
  );
};

export default Posts;
