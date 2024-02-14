'use client';

import { QueryClient, useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import { getPaginatePosts } from '@/service/posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

import Pagination from '../Pagination';
import Table from '../Table';

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
    },
    queryClient,
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  const { items, meta } = data;
  const { totalItems, currentPage, itemsPerPage, totalPages } = meta;

  return (
    <div>
      <Table
        items={items}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <Pagination
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        pageNumbersCount={limitQuery ? Number(limitQuery) : 10}
        onChangePage={async (page) => {
          await setPageQuery(`${page}`);
        }}
      />
    </div>
  );
};

export default Posts;
