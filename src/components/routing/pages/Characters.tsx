import { type TSort } from '../../../types/main';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { countPaginationOffset } from '../../../utils/utils';
import usePagesAmount from '../../hooks/usePagesAmount';
import Pagination from '../../UI/Pagination/Pagination';
import Section from '../../UI/Section/Section';
import CardsList from '../../UI/CardsList/CardsList';

export default function Characters() {
  const nav = useNavigate();
  const fetchLimit = 105;

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePagesAmount({
    fetchLimit: fetchLimit,
    endpoint: 'characters',
  });

  const pagination = (
    <Pagination
      pagesAmount={pagesAmount}
      currentPage={currentPage}
      pagesLimit={17}
    />
  );

  // Redirecting if page is non-existent
  useEffect(() => {
    if (currentPage > pagesAmount && pagesAmount > 0) {
      nav(`/characters#page=${pagesAmount}`);
    } else if (currentPage <= 0) {
      nav(`/characters#page=1`);
    }
  }, [nav, pagesAmount, currentPage]);

  const sortRef = useRef<TSort>({ property: 'mug_shot' });

  return (
    <Section title="Characters">
      {pagination}

      <CardsList
        apiOptions={{
          endpoint: 'characters',
          fields: 'name,mug_shot.url',
          limit: fetchLimit,
          offset: countPaginationOffset(currentPage, fetchLimit),
          sort: sortRef.current,
        }}
        cardSize="mini"
        linkPrefix="../"
      />

      {pagination}
    </Section>
  );
}
