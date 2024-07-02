import { useLocation } from 'react-router-dom';
import Section from '../components/Section/Section';
import CardsList from '../components/CardsList/CardsList';

export default function Search() {
  const { hash } = useLocation();
  const query = hash.substring(1);

  return (
    <Section title="Search results">
      <CardsList
        apiOptions={{
          endpoint: 'games',
          search: query,
          fields: 'name,cover.image_id,aggregated_rating,first_release_date',
          limit: 500,
        }}
        linkPrefix="../"
      />
    </Section>
  );
}
