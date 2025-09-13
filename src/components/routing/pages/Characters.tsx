import { type TSort } from '../../../types/main';
import { useRef } from 'react';
import { countPaginationOffset } from '../../../utils/utils';
import Section from '../../UI/Section/Section';
import CardsList from '../../UI/CardsList/CardsList';
import usePagination from '../../hooks/pagination/usePagination';

export default function Characters() {
  const fetchLimit = 105;

  // Creating pagination
  const { paginationUI, pagesCount, currentPage } = usePagination({
    fetchLimit: fetchLimit,
    endpoint: 'characters',
    pagesLimit: 17,
  });

  const sortRef = useRef<TSort>({ property: 'mug_shot' });

  return (
    <Section title="Characters">
      {/* Top pagination */}
      {pagesCount !== 0 && paginationUI}

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

      {/* Bottom pagination */}
      {pagesCount !== 0 && paginationUI}
    </Section>
  );
}
