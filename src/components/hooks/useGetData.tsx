import { type TDataFull, type TUseGetDataProps } from '../../types/data';
import { type TError } from '../../types/main';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getData } from '../api/api';
import { catchFetchError } from '../../utils/utils';

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
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getData({
      apiOptions: {
        endpoint,
        search,
        fields,
        limit,
        sort,
        filter,
        offset,
      },
      signal: signal,
    })
      .then((data) => setData(data))
      .catch((error) => catchFetchError(error, setError))
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [endpoint, search, fields, limit, sort, filter, offset, pageID]);

  useEffect(() => {
    setLoading(true);
  }, [location]);

  return { data, loading, error };
}
