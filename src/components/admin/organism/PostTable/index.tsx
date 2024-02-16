'use client';
import { useRouter } from 'next/navigation';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Post } from '@/types/posts.type';
import dayjs from '@/utils/dayjs';

interface Props {
  items: Post[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const PostTable = ({ items, totalItems, currentPage, itemsPerPage }: Props) => {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={'w-[50px]'} />
          <TableHead className={'w-[70px]'}>No.</TableHead>
          <TableHead className={'w-[230px]'}>이미지</TableHead>
          <TableHead className={'w-[auto]'}>제목</TableHead>
          <TableHead className={'w-[170px]'}>타입</TableHead>
          <TableHead className={'w-[60px] text-center'}>판매</TableHead>
          <TableHead className={'w-[130px]'}>생성일</TableHead>
          <TableHead className={'w-[130px]'}>수정일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
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
              <Checkbox />
            </TableCell>
            <TableCell>
              {totalItems - itemsPerPage * (currentPage - 1) - index}
            </TableCell>
            <TableCell>
              {/*<Image*/}
              {/*  width={100}*/}
              {/*  height={100}*/}
              {/*  src="/next.svg"*/}
              {/*  alt="placeholder"*/}
              {/*/>*/}
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.artType}</TableCell>
            <TableCell className={'text-center'}>
              {item.isSold ? 'Y' : 'N'}
            </TableCell>
            <TableCell>{dayjs(item.createAt).format('YYYY-MM-DD')}</TableCell>
            <TableCell>{dayjs(item.updateAt).format('YYYY-MM-DD')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostTable;
