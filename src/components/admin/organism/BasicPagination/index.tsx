'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/usePagination';

export interface Props {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  pageNumbersCount: number;
  onChangePage(page: number): void;
}

const BasicPagination = ({
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
    <Pagination>
      <PaginationContent>
        {!isShowGoPrevGroup && (
          <PaginationItem>
            <PaginationPrevious onClick={goPrevGroup} />
          </PaginationItem>
        )}
        {pageNumbers.map((page) => (
          <PaginationItem
            key={page}
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => goPage(page)}
          >
            <PaginationLink isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {!isShowGoNextGroup && (
          <PaginationItem>
            <PaginationNext onClick={goNextGroup} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default BasicPagination;
