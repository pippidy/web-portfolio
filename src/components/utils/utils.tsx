import { THandlePaginationRedirect } from '../../types/types';

export function handlePaginationRedirect({
  nav,
  currentPage,
  pagesAmount,
}: THandlePaginationRedirect) {
  if (currentPage > pagesAmount) {
    return nav(`/characters#page=${pagesAmount}`);
  } else if (currentPage <= 0) {
    return nav(`/characters#page=1`);
  }
}
