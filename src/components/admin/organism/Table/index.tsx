'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Post } from '@/types/posts.type';
import dayjs from '@/utils/dayjs';

interface Props {
  items: Post[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const Table = ({ items, totalItems, currentPage, itemsPerPage }: Props) => {
  const router = useRouter();

  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>No.</th>
          <th>이미지</th>
          <th>제목</th>
          <th>타입</th>
          <th>판매</th>
          <th>생성일</th>
          <th>수정일</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={item.id}
            onClick={() => {
              router.push(`/admin/posts/${item.id}`);
            }}
          >
            <td
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input type="checkbox" />
            </td>
            <td>{totalItems - itemsPerPage * (currentPage - 1) - index}</td>
            <td>
              <Image
                width={100}
                height={100}
                src="/next.svg"
                alt="placeholder"
              />
            </td>
            <td>{item.title}</td>
            <td>{item.artType}</td>
            <td>{item.isSold ? 'Y' : 'N'}</td>
            <td>{dayjs(item.createAt).format('YYYY-MM-DD')}</td>
            <td>{dayjs(item.updateAt).format('YYYY-MM-DD')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
