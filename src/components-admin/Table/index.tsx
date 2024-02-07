'use client';
import Image from 'next/image';

import { Post } from '@/types/posts.type';
import dayjs from '@/utils/dayjs';

import { css } from '../../../styled-system/css';

const tableItemBaseStyle = css.raw({
  p: '10px 0',
  textAlign: 'center',
});
const tableItemWidthStyle = css.raw({
  '& th:nth-child(1)': { width: '40px' },
  '& th:nth-child(2)': { width: '50px' },
  '& th:nth-child(3)': { width: '200px' },
  '& th:nth-child(4)': { width: 'auto', textAlign: 'left' },
  '& th:nth-child(5)': { width: '100px' },
  '& th:nth-child(6)': { width: '40px' },
  '& th:nth-child(7)': { width: '120px' },
  '& th:nth-child(8)': { width: '120px' },
});

interface Props {
  items: Post[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const Table = ({ items, totalItems, currentPage, itemsPerPage }: Props) => {
  return (
    <table
      className={css({
        width: '100%',
      })}
    >
      <thead
        className={css({
          bgColor: 'whitesmoke',
        })}
      >
        <tr
          className={css(
            {
              '& th': { ...tableItemBaseStyle, fontWeight: 'bold' },
            },
            tableItemWidthStyle,
          )}
        >
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
            className={css({
              '& td': tableItemBaseStyle,
              cursor: 'pointer',
              _hover: {
                backgroundColor: '#fafafa',
              },
            })}
            onClick={() => {
              console.log('click');
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
            <td className={css({ textAlign: 'left !important' })}>
              {item.title}
            </td>
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
