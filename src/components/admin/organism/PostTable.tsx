'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ImagesVariants } from '@/constants/images.enum';
import { ArtType } from '@/constants/post.enum';
import useAdminPostsStore from '@/store/admin-posts';
import { Post } from '@/types/posts.type';
import { artTypeToKorean, getCFUrl } from '@/utils/common';
import dayjs from '@/utils/dayjs';

interface Props {
  items: Post[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const PostTable = ({ items, totalItems, currentPage, itemsPerPage }: Props) => {
  const { checkedPosts, setCheckedPosts } = useAdminPostsStore();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const router = useRouter();

  const onChangeCheckedItems = (id: number) => {
    if (checkedPosts.includes(id)) {
      setCheckedPosts(checkedPosts.filter((item) => item !== id));
    } else {
      setCheckedPosts([...checkedPosts, id]);
    }
  };

  useEffect(() => {
    setIsAllChecked(
      items.length === 0 ? false : checkedPosts.length === items.length,
    );
  }, [checkedPosts, items.length]);

  return (
    <Table>
      <TableCaption>*그린날 순서로 정렬됩니다</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className={'w-[50px]'}>
            <Checkbox
              checked={isAllChecked}
              onClick={() => {
                setCheckedPosts(
                  isAllChecked ? [] : items.map((item) => item.id),
                );
              }}
            />
          </TableHead>
          <TableHead className={'w-[70px]'}>No.</TableHead>
          <TableHead className={'w-[230px]'}>이미지</TableHead>
          <TableHead className={'w-[auto]'}>제목</TableHead>
          <TableHead className={'w-[90px]'}>타입</TableHead>
          <TableHead className={'w-[60px] text-center'}>판매</TableHead>
          <TableHead className={'w-[130px]'}>그린날</TableHead>
          <TableHead className={'w-[130px]'}>생성일</TableHead>
          <TableHead className={'w-[130px]'}>수정일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={999} className={'text-center'}>
              게시글이 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          items.map((item, index) => (
            <TableRow
              key={item.id}
              className={'cursor-pointer'}
              onClick={() => {
                router.push(`/admin/posts/${item.id}`);
              }}
            >
              <TableCell
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  checked={checkedPosts.includes(item.id)}
                  onClick={() => onChangeCheckedItems(item.id)}
                />
              </TableCell>
              <TableCell>
                {totalItems - itemsPerPage * (currentPage - 1) - index}
              </TableCell>
              <TableCell>
                {item.img && (
                  <div className={'h-[100px] w-[200px] relative'}>
                    <Image
                      fill
                      src={getCFUrl(item.img.id, ImagesVariants.ADMIN_POST)}
                      alt="placeholder"
                      unoptimized
                      className={'h-full w-full object-contain'}
                    />
                  </div>
                )}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{artTypeToKorean(item.artType as ArtType)}</TableCell>
              <TableCell className={'text-center'}>
                {item.isSold ? 'Y' : 'N'}
              </TableCell>
              <TableCell>
                {item.drawingDate &&
                  dayjs(item.drawingDate).format('YYYY-MM-DD')}
              </TableCell>
              <TableCell>{dayjs(item.createAt).format('YYYY-MM-DD')}</TableCell>
              <TableCell>{dayjs(item.updateAt).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default PostTable;
