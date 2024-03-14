'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import InfiniteScroll from 'react-infinite-scroller';

import PostFilter from '@/components/user/organism/PostFilter';
import PostItem, {
  PostItemSkeleton,
} from '@/components/user/organism/PostItem';
import { ArtType } from '@/constants/post.enum';
import { getPaginatePosts } from '@/service/posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

const Posts = () => {
  const [typeQuery, setTypeQuery] = useQueryState('type');
  const { data, isPending, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery<Paginate<Post>>({
      queryKey: ['posts', typeQuery],
      queryFn: async ({ pageParam = 1 }) => {
        return getPaginatePosts({
          page: pageParam as number,
          limit: 10,
          artTypes: typeQuery ? [typeQuery as ArtType] : [],
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.meta.totalPages !== 0 &&
          lastPage.meta.totalPages !== allPages.length
          ? allPages.length + 1
          : undefined;
      },
    });

  return (
    <div className={'relative container mx-auto'}>
      <PostFilter
        value={(typeQuery as ArtType) || 'ALL'}
        onValueChange={async (value) => {
          await setTypeQuery(value || '');
        }}
      />
      {isPending ? (
        <div className={'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'}>
          {Array.from({ length: 10 }).map((_, index) => (
            <PostItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        data && (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={<PostItemSkeleton />}
            threshold={500}
            className={'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'}
          >
            {data.pages.map((pageData) =>
              pageData.items.map((post) => (
                <PostItem key={post.id} postItem={post} />
              )),
            )}
          </InfiniteScroll>
        )
      )}
    </div>
  );
};

export default Posts;
