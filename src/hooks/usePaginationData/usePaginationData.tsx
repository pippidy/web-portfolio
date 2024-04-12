import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDataCount } from '../../components/Api/Api';

export default function usePaginationData(dataFilter?: string) {
  const { id: pageID } = useParams();
  const [pagesAmount, setPagesAmount] = useState(0);
  const location = useLocation();
  const currentPage = Number(location.hash.match(/[0-9]+/));
  const fetchLimit = 100;

  useEffect(() => {
    getDataCount({
      endpoint: 'games',
      filter: dataFilter ? dataFilter : '',
    }).then((data) => {
      setPagesAmount(Math.floor(data.count / fetchLimit));
    });
  }, [pageID, pagesAmount, dataFilter]);

  return { pagesAmount, currentPage, location };
}
