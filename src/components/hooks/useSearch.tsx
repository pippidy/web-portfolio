import { type TError } from '../../types/main';
import { type TDataGame } from '../../types/data';
import { type TUseSearchProps } from '../../types/props';
import { useCallback, useEffect, useState } from 'react';
import { getData } from '../api/api';
import { catchFetchError } from '../../utils/utils';

export default function useSearch({ query, limit = 10 }: TUseSearchProps) {
  const [data, setData] = useState<TDataGame[] | null>();
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TError>();

  const doSearch = useCallback(
    (query: string, signal: AbortSignal) => {
      setData(null);

      if (query.length > 0) {
        setIsSearching(true);

        if (query.length > 1) {
          setIsLoading(true);

          getData({
            apiOptions: {
              endpoint: 'games',
              search: query,
              fields: 'name,cover.image_id',
              limit: limit,
            },
            signal: signal,
          })
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              catchFetchError(error, setError);
            })
            .finally(() => setIsLoading(false));
        }
      } else {
        setIsSearching(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const delayDebounce = setTimeout(() => {
      doSearch(query, signal);
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query, doSearch]);

  return { data, setData, isSearching, setIsSearching, isLoading, error };
}
