import { useMemo } from 'react';

export interface IProps {
  totalItemCount: number;
  currentPage: number;
  perPageCount?: number;
  onChangePage(page: number): void;
}

export const usePagination = ({
  onChangePage,
  currentPage,
  totalItemCount,
  perPageCount = 10,
}: IProps) => {
  const viewPage = perPageCount;
  const lastPageGroup = Math.ceil(totalItemCount / viewPage);
  const pageGroup = Math.ceil(currentPage / viewPage);
  const lastPage =
    pageGroup * viewPage > totalItemCount
      ? totalItemCount
      : pageGroup * viewPage;
  const firstPage = useMemo(() => {
    if (pageGroup === 1) {
      return 1;
    }
    if (pageGroup === lastPageGroup) {
      const remainingPage = totalItemCount % viewPage;
      return totalItemCount - remainingPage + 1;
    } else {
      return lastPage - (viewPage - 1) <= 0 ? 1 : lastPage - (viewPage - 1);
    }
  }, [pageGroup, lastPageGroup, totalItemCount, viewPage, lastPage]);
  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = firstPage; i <= lastPage; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [firstPage, lastPage]);
  const goPrev = () => onChangePage(firstPage - 2);
  const goNext = () => onChangePage(lastPage);
  const goFirst = () => onChangePage(0);
  const goLast = () => onChangePage(totalItemCount - 1);
  const goPageByNumber = (page: number) => onChangePage(page);

  return {
    firstPage,
    lastPage,
    pageNumbers,
    goFirst,
    goLast,
    goNext,
    goPrev,
    goPageByNumber,
  };
};
