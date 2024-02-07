export interface IProps {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  pageNumbersCount?: number;
  onChangePage(page: number): void;
}

export const usePagination = ({
  totalItems,
  totalPages,
  currentPage,
  itemsPerPage,
  pageNumbersCount = 2,
  onChangePage,
}: IProps) => {
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const isShowGoPrevGroup = currentPage / pageNumbersCount <= 1;
  const isShowGoNextGroup =
    Math.ceil(lastPage / pageNumbersCount) ===
    Math.ceil(currentPage / pageNumbersCount);
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage =
      Math.floor((currentPage - 1) / pageNumbersCount) * pageNumbersCount + 1;
    const endPage = Math.min(startPage + pageNumbersCount - 1, totalPages);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  const pageNumbers = getPageNumbers();

  const goPrevGroup = () =>
    onChangePage(
      currentPage - pageNumbersCount <= 0 ? currentPage - pageNumbersCount : 1,
    );
  const goNextGroup = () =>
    onChangePage(
      currentPage + pageNumbersCount >= lastPage
        ? lastPage
        : currentPage + pageNumbersCount,
    );
  const goPage = (page: number) => onChangePage(page);

  return {
    isShowGoPrevGroup,
    isShowGoNextGroup,
    pageNumbers,
    goNextGroup,
    goPrevGroup,
    goPage,
  };
};
