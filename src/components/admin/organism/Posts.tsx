'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

import PostTable from '@/components/admin/organism/PostTable';
import { LoadingSpinner } from '@/components/common/atom/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';
import { deletePost, getPaginatePosts } from '@/service/posts';
import useAdminPostsStore from '@/store/admin-posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

import BasicPagination from './BasicPagination';

const Posts = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { alertDialog } = useModal();
  const { checkedPosts, setCheckedPosts } = useAdminPostsStore();
  const [pageQuery, setPageQuery] = useQueryState('page');
  const [limitQuery] = useQueryState('limit');
  const { data, refetch } = useQuery<Paginate<Post>>({
    queryKey: ['posts', pageQuery],
    queryFn: () => {
      return getPaginatePosts({
        page: Number(pageQuery || 1),
        limit: Number(limitQuery || 10),
      });
    },
    placeholderData: (previousData) => previousData,
  });

  return (
    <>
      <div className={'flex justify-between mb-3'}>
        <Button
          variant={'destructive'}
          onClick={async () => {
            if (checkedPosts.length === 0) {
              await alertDialog({
                description: '삭제할 게시글을 선택해주세요.',
                isHideCancel: true,
              });
            } else {
              const isConfirm = await alertDialog({
                description: '선택한 게시글을 삭제하시겠습니까?',
              });

              if (isConfirm) {
                setIsDeleting(true);
                await deletePost(checkedPosts);
                setCheckedPosts([]);
                await refetch().then((res) => {
                  const totalPages = res.data?.meta.totalPages || 1;

                  if (
                    Number(pageQuery) !== 1 &&
                    Number(pageQuery) > totalPages
                  ) {
                    setPageQuery(`${totalPages}`);
                  }
                });
                setIsDeleting(false);
              }
            }
          }}
        >
          일괄 삭제{isDeleting && <LoadingSpinner className={'ml-2'} />}
        </Button>
        <Button asChild>
          <Link href={'/admin/posts/new'}>새글 등록</Link>
        </Button>
      </div>
      <div className={'flex flex-col gap-5'}>
        <PostTable
          items={data?.items || []}
          totalItems={data?.meta.totalItems || 0}
          currentPage={data?.meta.currentPage || 1}
          itemsPerPage={data?.meta.itemsPerPage || 10}
        />
        {data && data.items.length > 0 && (
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
        )}
      </div>
    </>
  );
};

export default Posts;
