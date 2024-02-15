'use client';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { usePagination } from '@/hooks/usePagination';

export interface Props {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  pageNumbersCount: number;
  onChangePage(page: number): void;
}

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
    <div>
      {!isShowGoPrevGroup && (
        <button onClick={goPrevGroup}>
          <FaAngleLeft />
        </button>
      )}
      <div>
        {pageNumbers.map((page) => (
          <button
            key={page}
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => goPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {!isShowGoNextGroup && (
        <button onClick={goNextGroup}>
          <FaAngleRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
