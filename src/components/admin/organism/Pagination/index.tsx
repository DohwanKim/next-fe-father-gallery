'use client';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { usePagination } from '@/hooks/usePagination';

import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';

export interface Props {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  pageNumbersCount: number;
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
  totalItems,
  totalPages,
  currentPage,
  itemsPerPage,
  pageNumbersCount,
  onChangePage,
}: Props) => {
  const {
    isShowGoPrevGroup,
    isShowGoNextGroup,
    pageNumbers,
    goPrevGroup,
    goNextGroup,
    goPage,
  } = usePagination({
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage,
    pageNumbersCount,
    onChangePage,
  });

  return (
    <div className={css(flexCenter, { mt: '16px' })}>
      {!isShowGoPrevGroup && (
        <button
          className={css(flexCenter, cursorPointer, {
            mr: '8px',
          })}
          onClick={goPrevGroup}
        >
          <FaAngleLeft />
        </button>
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
            onClick={() => goPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {!isShowGoNextGroup && (
        <button
          className={css(flexCenter, cursorPointer, { ml: '8px' })}
          onClick={goNextGroup}
        >
          <FaAngleRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
