import { useEffect, useState } from 'react';
import { TDataFull } from '../types/data';
import { useLocation } from 'react-router-dom';
import { getData } from '../api/api';
import { catchFetchError } from '../utils/utils';
import { TApiOptions } from '../types/main';

export default function useGetData({
  endpoint,
  search,
  fields = '*',
  limit,
  sort,
  filter,
  offset,
}: TApiOptions) {
  const [data, setData] = useState<TDataFull[]>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getData({
      endpoint: endpoint,
      search: search,
      fields: fields,
      limit: limit,
      sort: sort,
      filter: filter,
      offset: offset,
      signal: signal,
    })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        catchFetchError(error);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [endpoint, search, fields, limit, sort, filter, offset]);

  useEffect(() => {
    setLoading(true);
  }, [location]);

  return { data, loading };
}
