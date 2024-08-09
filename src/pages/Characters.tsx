import { type TApiOptions } from '../types/main';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CardsList from '../components/CardsList/CardsList';
import Pagination from '../components/Pagination/Pagination';
import Section from '../components/Section/Section';
import usePagesAmount from '../hooks/usePagesAmount';

export default function Characters() {
  const nav = useNavigate();
  const fetchLimit = 102;

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePagesAmount({
    fetchLimit: fetchLimit,
    endpoint: 'characters',
  });

  const pagination = (
    <Pagination pagesAmount={pagesAmount} currentPage={currentPage} />
  );

  // Redirecting if page is non-existent
  useEffect(() => {
    if (currentPage > pagesAmount && pagesAmount > 0) {
      nav(`/characters#page=${pagesAmount}`);
    } else if (currentPage <= 0) {
      nav(`/characters#page=1`);
    }
  }, [nav, pagesAmount, currentPage]);

  const apiOtionsRef = useRef<TApiOptions>({
    endpoint: 'characters',
    fields: 'name,mug_shot.url',
    limit: fetchLimit,
    offset: fetchLimit * currentPage,
    sort: { property: 'mug_shot' },
  });

  return (
    <Section title="Characters">
      {pagination}

      <CardsList
        apiOptions={apiOtionsRef.current}
        cardSize="mini"
        linkPrefix="../"
      />

      {pagination}
    </Section>
  );
}
