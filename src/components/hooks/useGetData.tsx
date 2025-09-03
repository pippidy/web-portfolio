import { type TDataFull, type TUseGetDataProps } from '../../types/data';
import { type TError } from '../../types/main';
import { useEffect, useState } from 'react';
import { getData } from '../api/api';
import { handleError } from '../../utils/utils';

export default function useGetData({
  endpoint,
  search,
  fields,
  limit,
  sort,
  filter,
  offset,
  pageID,
}: TUseGetDataProps) {
  const [data, setData] = useState<TDataFull[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<TError>();

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    getData({
      queryParams: {
        endpoint,
        search,
        fields,
        limit,
        sort,
        filter,
        offset,
      },
      signal: controller.signal,
    })
      .then((data) => setData(data))
      .catch((err) => handleError(err, setError))
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [endpoint, search, fields, limit, sort, filter, offset, pageID]);

  return { data, loading, error };
}
