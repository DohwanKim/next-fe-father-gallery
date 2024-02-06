import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from 'react-icons/fa6';

import { usePagination } from '@/hooks/usePagination';

import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

export interface Props {
  totalItemCount: number;
  currentPage: number;
  perPageCount?: number;
  onChangePage(page: number): void;
}

const flexCenter = css.raw({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const cursorPointer = css.raw({
  cursor: 'pointer',
});

const Pagination = ({
  totalItemCount,
  currentPage,
  perPageCount = 10,
  onChangePage,
}: Props) => {
  const {
    firstPage,
    lastPage,
    pageNumbers,
    goFirst,
    goLast,
    goNext,
    goPrev,
    goPageByNumber,
  } = usePagination({
    onChangePage,
    currentPage,
    totalItemCount,
    perPageCount,
  });

  return (
    <div className={css(flexCenter, { mt: '16px' })}>
      {totalItemCount > 1 && firstPage > 1 && (
        <>
          <button className={css(flexCenter, cursorPointer)} onClick={goFirst}>
            <FaAnglesLeft />
          </button>
          <button
            className={css(flexCenter, cursorPointer, {
              mr: '8px',
            })}
            onClick={goPrev}
          >
            <FaAngleLeft />
          </button>
        </>
      )}
      <div
        className={flex({
          gap: '8px',
        })}
      >
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={css(
              {
                fontWeight: currentPage === page ? 'bold' : 'normal',
              },
              cursorPointer,
            )}
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => goPageByNumber(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {lastPage < totalItemCount && (
        <>
          <button
            className={css(flexCenter, cursorPointer, { ml: '8px' })}
            onClick={goNext}
          >
            <FaAngleRight />
          </button>
          <button className={css(flexCenter, cursorPointer)} onClick={goLast}>
            <FaAnglesRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
