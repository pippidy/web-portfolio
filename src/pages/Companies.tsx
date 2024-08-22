import { type TSort } from '../types/main';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CardsList from '../components/CardsList/CardsList';
import Pagination from '../components/Pagination/Pagination';
import Section from '../components/Section/Section';
import usePagesAmount from '../hooks/usePagesAmount';
import { countPaginationOffset } from '../utils/utils';

export default function Companies() {
  const nav = useNavigate();
  const fetchLimit = 102;

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePagesAmount({
    fetchLimit: fetchLimit,
    endpoint: 'companies',
  });

  const pagination = (
    <Pagination
      pagesAmount={pagesAmount}
      currentPage={currentPage}
      pagesLimit={15}
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

  const sortRef = useRef<TSort>({ property: 'logo' });

  return (
    <Section title="Companies">
      {pagination}

      <CardsList
        apiOptions={{
          endpoint: 'companies',
          fields: 'name,logo.url',
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
