import { type TUsePaginationData as TUsePagesAmountProps } from '../../types/pagination';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDataCount } from '../api/api';
import { handleError } from '../../utils/utils';

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

    getDataCount({
      endpoint: endpoint,
      filter: dataFilter ? dataFilter : '',
      signal: controller.signal,
    })
      .then((data) => {
        data && setPagesAmount(Math.ceil(data.count / fetchLimit));
      })
      .catch((error) => {
        handleError(error);
      });

    return () => {
      controller.abort();
    };
  }, [endpoint, fetchLimit, pageID, dataFilter]);

  return { pagesAmount, currentPage, location };
}
