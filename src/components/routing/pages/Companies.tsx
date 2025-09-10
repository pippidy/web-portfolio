import { type TSort } from '../../../types/main';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { countPaginationOffset } from '../../../utils/utils';
import Section from '../../UI/Section/Section';
import CardsList from '../../UI/CardsList/CardsList';
import usePagination from '../../hooks/pagination/usePagination';

export default function Companies() {
  const nav = useNavigate();
  const fetchLimit = 105;

  // Creating pagination
  const { paginationUI, pagesCount, currentPage } = usePagination({
    fetchLimit: fetchLimit,
    endpoint: 'companies',
    pagesLimit: 17,
  });

  // Redirecting if page is non-existent
  useEffect(() => {
    if (currentPage > pagesCount && pagesCount > 0) {
      nav(`/characters#page=${pagesCount}`);
    } else if (currentPage <= 0) {
      nav(`/characters#page=1`);
    }
  }, [nav, pagesCount, currentPage]);

  const sortRef = useRef<TSort>({ property: 'logo' });

  return (
    <Section title="Companies">
      {paginationUI}

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

      {paginationUI}
    </Section>
  );
}
