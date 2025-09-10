import { type TUsePagesCountProps } from '../../../types/pagination';
import { useEffect, useState } from 'react';
import { getDataCount } from '../../api/api';
import { handleError } from '../../../utils/utils';

export default function usePagesCount({
  fetchLimit = 100,
  endpoint,
  dataFilter,
}: TUsePagesCountProps) {
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getDataCount({
      endpoint: endpoint,
      filter: dataFilter ? dataFilter : '',
      signal: controller.signal,
    })
      .then((data) => {
        data && setPagesCount(Math.ceil(data.count / fetchLimit));
      })
      .catch((error) => {
        handleError(error);
      });

    return () => {
      controller.abort();
    };
  }, [endpoint, fetchLimit, dataFilter]);

  return { pagesCount };
}
