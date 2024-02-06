import Image from 'next/image';

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

const Table = () => {
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
        <tr
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
          <td>1</td>
          <td>
            <Image width={100} height={100} src="/next.svg" alt="placeholder" />
          </td>
          <td className={css({ textAlign: 'left !important' })}>제목</td>
          <td>타입</td>
          <td>Y</td>
          <td>2021-08-01</td>
          <td>2021-08-01</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
