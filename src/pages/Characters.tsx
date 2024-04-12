import GameCardsList from '../components/GameCardsList/GameCardsList';
import Pagination from '../components/Pagination/Pagination';
import Section from '../components/Section/Section';
import usePaginationData from '../hooks/usePaginationData/usePaginationData';

export default function Characters() {
  const { pagesAmount, currentPage } = usePaginationData();

  return (
    <Section title="Characters">
      <Pagination
        keyID="char"
        pagesAmount={pagesAmount}
        currentPage={currentPage}
      />
      <GameCardsList endpoint="characters" fields={'*'} limit={100} compact />
    </Section>
  );
}
