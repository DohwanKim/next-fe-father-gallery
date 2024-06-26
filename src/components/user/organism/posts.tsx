'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import InfiniteScroll from 'react-infinite-scroller';

import PostItem from '@/components/user/organism/post-item';
import PostItemSkeleton from '@/components/user/organism/post-item-skeleton';
import { ArtType } from '@/constants/post.enum';
import { getPaginatePosts } from '@/service/posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

const Posts = () => {
  const [typeQuery] = useQueryState('type');
  const { data, isPending, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery<Paginate<Post>>({
      queryKey: ['posts', typeQuery],
      queryFn: async ({ pageParam = 1 }) => {
        const artTypes =
          typeQuery === 'ETC'
            ? ['NONE']
            : typeQuery
              ? [typeQuery as ArtType]
              : ['WATERCOLOR'];

        return getPaginatePosts({
          page: pageParam as number,
          limit: 10,
          artTypes: artTypes as ArtType[],
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
            loader={<PostItemSkeleton key={``} />}
            threshold={500}
            data-testid="post-grid"
            className={'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'}
          >
            {data.pages.map((pageData) =>
              pageData.items.map((post, index) => (
                <PostItem key={`${index}-${post.id}}`} postItem={post} />
              )),
            )}
          </InfiniteScroll>
        )
      )}
    </div>
  );
};

export default Posts;
