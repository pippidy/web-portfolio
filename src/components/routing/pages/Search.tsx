import { useLocation } from 'react-router-dom';
import CardsList from '../../UI/CardsList/CardsList';
import Section from '../../UI/Section/Section';

export default function Search() {
  const { hash } = useLocation();
  const query = hash.substring(1).replace('%20', ' ');

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
