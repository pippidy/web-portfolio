import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardsList from '../components/CardsList/CardsList';
import Pagination from '../components/Pagination/Pagination';
import Section from '../components/Section/Section';
import usePaginationData from '../hooks/usePaginationData';

export default function Companies() {
  const nav = useNavigate();
  const { id: pageID } = useParams();
  const fetchLimit = 102;

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePaginationData({
    fetchLimit: fetchLimit,
    endpoint: 'companies',
    pageID: pageID,
  });

  // Redirecting if page is non-existent
  useEffect(() => {
    if (currentPage > pagesAmount && pagesAmount > 0) {
      nav(`/characters#page=${pagesAmount}`);
    } else if (currentPage <= 0) {
      nav(`/characters#page=1`);
    }
  }, [nav, pagesAmount, currentPage]);

  const pagination = (
    <Pagination pagesAmount={pagesAmount} currentPage={currentPage} />
  );

  return (
    <Section title="Companies">
      {pagination}

      <CardsList
        apiOptions={{
          endpoint: 'companies',
          fields: 'name,logo.url',
          limit: fetchLimit,
          offset: fetchLimit * currentPage,
          sort: 'logo',
        }}
        cardSize="mini"
        linkPrefix="../"
      />

      {pagination}
    </Section>
  );
}
