import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDataCount } from '../../components/Api/Api';
import { TUsePaginationData } from '../../types/types';

export default function usePaginationData({
  endpoint,
  pageID,
  dataFilter,
}: TUsePaginationData) {
  const [pagesAmount, setPagesAmount] = useState(0);
  const location = useLocation();
  const currentPage = Number(location.hash.match(/[0-9]+/));
  const fetchLimit = 100;

  useEffect(() => {
    getDataCount({
      endpoint: endpoint,
      filter: dataFilter ? dataFilter : '',
    }).then((data) => {
      setPagesAmount(Math.floor(data.count / fetchLimit));
    });
  }, [endpoint, pageID, pagesAmount, dataFilter]);

  return { pagesAmount, currentPage, location };
}
