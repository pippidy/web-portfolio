import { type TUsePagination } from '../../../types/pagination';
import { useLocation } from 'react-router-dom';
import usePagesCount from './usePagesCount';
import CreatePaginationUI from '../../UI/Pagination/CreatePaginationUI';

export default function usePagination({
  fetchLimit = 100,
  endpoint,
  dataFilter,
  pagesLimit,
}: TUsePagination) {
  const location = useLocation();
  const currentPage = Number(location.hash.match(/[0-9]+/));

  const { pagesCount } = usePagesCount({
    fetchLimit: fetchLimit,
    endpoint: endpoint,
    dataFilter: dataFilter,
  });

  const paginationUI = (
    <CreatePaginationUI
      pagesCount={pagesCount}
      currentPage={currentPage}
      pagesLimit={pagesLimit}
    />
  );

  return { paginationUI, pagesCount, currentPage };
}
