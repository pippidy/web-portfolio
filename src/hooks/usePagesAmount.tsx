import { type TUsePaginationData as TUsePagesAmountProps } from '../types/pagination';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDataCount } from '../api/api';
import { catchFetchError } from '../utils/utils';

export default function usePagesAmount({
  fetchLimit = 100,
  endpoint,
  pageID,
  dataFilter,
}: TUsePagesAmountProps) {
  const [pagesAmount, setPagesAmount] = useState(0);
  const location = useLocation();
  const currentPage = Number(location.hash.match(/[0-9]+/));

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getDataCount({
      endpoint: endpoint,
      filter: dataFilter ? dataFilter : '',
      signal: signal,
    })
      .then((data) => {
        data && setPagesAmount(Math.floor(data.count / fetchLimit));
      })
      .catch((error) => {
        catchFetchError(error);
      });

    return () => {
      controller.abort();
    };
  }, [endpoint, fetchLimit, pageID, dataFilter]);

  return { pagesAmount, currentPage, location };
}
