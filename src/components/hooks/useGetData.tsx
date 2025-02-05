import { type TDataFull, type TUseGetDataProps } from '../../types/data';
import { type TError } from '../../types/main';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

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
      signal: controller.signal,
    })
      .then((data) => {
        console.log(data);

        setData(data);
      })
      .catch((err) => {
        console.log('123' + err);
        handleError(err, setError);
      })
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
