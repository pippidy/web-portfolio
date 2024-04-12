import { useNavigate, useParams } from 'react-router-dom';
import GameCardsList from '../components/GameCardsList/GameCardsList';
import Pagination from '../components/Pagination/Pagination';
import Section from '../components/Section/Section';
import usePaginationData from '../hooks/usePaginationData/usePaginationData';
import { useEffect } from 'react';

export default function Characters() {
  const navigate = useNavigate();
  const { id: pageID } = useParams();

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePaginationData({
    endpoint: 'characters',
    pageID: pageID,
  });

  const fetchLimit = 100;
  const offset = fetchLimit * currentPage;

  // Redirecting if page is non-existent
  useEffect(() => {
    if (currentPage > pagesAmount && pagesAmount > 0) {
      navigate(`/characters#page=${pagesAmount}`);
    } else if (currentPage <= 0) {
      navigate(`/characters#page=1`);
    }
  }, [navigate, pagesAmount, currentPage]);

  return (
    <Section title="Characters">
      <Pagination
        keyID="top"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />

      <GameCardsList
        endpoint="characters"
        fields={'*'}
        limit={fetchLimit}
        offset={offset}
        compact
      />

      <Pagination
        keyID="bottom"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />
    </Section>
  );
}
