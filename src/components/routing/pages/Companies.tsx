import { type TSort } from '../../../types/main';
import { useRef } from 'react';
import { countPaginationOffset } from '../../../utils/utils';
import Section from '../../UI/Section/Section';
import CardsList from '../../UI/CardsList/CardsList';
import usePagination from '../../hooks/pagination/usePagination';

export default function Companies() {
  const fetchLimit = 105;

  // Creating pagination
  const { paginationUI, pagesCount, currentPage } = usePagination({
    fetchLimit: fetchLimit,
    endpoint: 'companies',
    pagesLimit: 17,
  });

  const sortRef = useRef<TSort>({ property: 'logo' });

  return (
    <Section title="Companies">
      {/* Top pagination */}
      {pagesCount !== 0 && paginationUI}

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

      {/* Bottom pagination */}
      {pagesCount !== 0 && paginationUI}
    </Section>
  );
}
