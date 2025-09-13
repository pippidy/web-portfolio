import { type TUsePagination } from '../../../types/pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import usePagesCount from './usePagesCount';
import CreatePaginationUI from '../../UI/Pagination/CreatePaginationUI';

export default function usePagination({
  fetchLimit = 100,
  endpoint,
  dataFilter,
  pagesLimit,
}: TUsePagination) {
  const nav = useNavigate();
  const location = useLocation();
  const currentPage = Number(location.hash.match(/[0-9]+/));

  const { pagesCount } = usePagesCount({
    fetchLimit: fetchLimit,
    endpoint: endpoint,
    dataFilter: dataFilter,
  });

  // Redirect
  if (currentPage > pagesCount && pagesCount > 0) {
    nav(`${location.pathname}#page=${pagesCount}`);
  } else if (currentPage <= 0) {
    nav(`${location.pathname}#page=1`);
  }

  const paginationUI = (
    <CreatePaginationUI
      pagesCount={pagesCount}
      currentPage={currentPage}
      pagesLimit={pagesLimit}
    />
  );

  return { paginationUI, pagesCount, currentPage };
}
