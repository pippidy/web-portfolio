import { useNavigate, useParams } from 'react-router-dom';
import CardsList from '../components/CardsList/CardsList';
import Pagination from '../components/Pagination/Pagination';
import Section from '../components/Section/Section';
import usePaginationData from '../hooks/usePaginationData';
import { useEffect } from 'react';

export default function Companies() {
  const navigate = useNavigate();
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
      navigate(`/characters#page=${pagesAmount}`);
    } else if (currentPage <= 0) {
      navigate(`/characters#page=1`);
    }
  }, [navigate, pagesAmount, currentPage]);

  return (
    <Section title="Companies">
      <Pagination
        keyID="top"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />

      <CardsList
        endpoint="companies"
        fields={'name,logo.url'}
        limit={fetchLimit}
        offset={fetchLimit * currentPage}
        sort="logo"
        cardSize="mini"
        linkPrefix="../"
      />

      <Pagination
        keyID="bottom"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />
    </Section>
  );
}
