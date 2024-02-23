'use client';

import { QueryClient, useQuery } from '@tanstack/react-query';

import PostItem from '@/components/user/organism/PostItem';
import { getPaginatePosts } from '@/service/posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

const queryClient = new QueryClient();

const Posts = () => {
  const { data } = useQuery<Paginate<Post>>(
    {
      queryKey: ['posts'],
      queryFn: () => {
        return getPaginatePosts({
          page: Number(1),
          limit: Number(100),
        });
      },
      placeholderData: (previousData) => previousData,
    },
    queryClient,
  );

  return (
    <div className={'container mx-auto grid grid-cols-3 gap-x-12 gap-y-24'}>
      {data &&
        data.items.map((post) => <PostItem key={post.id} postItem={post} />)}
    </div>
  );
};

export default Posts;
