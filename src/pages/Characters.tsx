import { useNavigate, useParams } from 'react-router-dom';
import GameCardsList from '../components/GameCardsList/GameCardsList';
import Pagination from '../components/Pagination/Pagination';
import Section from '../components/Section/Section';
import usePaginationData from '../hooks/usePaginationData/usePaginationData';
import { handlePaginationRedirect } from '../components/Utils/Utils';

export default function Characters() {
  const { id: pageID } = useParams();
  const navigate = useNavigate();
  const { pagesAmount, currentPage } = usePaginationData({ pageID: pageID });

  // Redirecting if wrong page
  handlePaginationRedirect({ nav: navigate, currentPage, pagesAmount });

  return (
    <Section title="Characters">
      <Pagination
        keyID="top"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />

      <GameCardsList endpoint="characters" fields={'*'} limit={100} compact />

      <Pagination
        keyID="bottom"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />
    </Section>
  );
}
