import { useNavigate, useParams } from 'react-router-dom';
import CardsList from '../components/CardsList/CardsList';
import Pagination from '../components/Pagination/Pagination';
import Section from '../components/Section/Section';
import usePaginationData from '../hooks/usePaginationData/usePaginationData';
import { useEffect } from 'react';

export default function Characters() {
  const navigate = useNavigate();
  const { id: pageID } = useParams();
  const fetchLimit = 102;

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePaginationData({
    fetchLimit: fetchLimit,
    endpoint: 'characters',
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
    <Section title="Characters">
      <Pagination
        keyID="top"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />

      <CardsList
        endpoint="characters"
        fields={'name,mug_shot.url'}
        limit={fetchLimit}
        offset={fetchLimit * currentPage}
        sort="mug_shot"
        mini
      />

      <Pagination
        keyID="bottom"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />
    </Section>
  );
}
