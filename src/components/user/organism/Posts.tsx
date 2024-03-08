'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
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
  const [artTypes, setArtTypes] = useState<ArtType | undefined>(undefined);
  const { data, isPending, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery<Paginate<Post>>({
      queryKey: ['posts', artTypes],
      queryFn: ({ pageParam = 1 }) =>
        getPaginatePosts({
          page: pageParam as number,
          limit: 9,
          artTypes: artTypes ? [artTypes] : [],
        }),
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
        value={artTypes}
        onValueChange={(value) => {
          setArtTypes(value);
        }}
      />
      {isPending ? (
        <div className={'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'}>
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
        </div>
      ) : (
        data && (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
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
