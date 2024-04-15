import Catalogue from '../components/Catalogue/Catalogue';

export default function Genres() {
  return (
    <Catalogue
      endpoint="games"
      category="genres"
      title="Browse games by genre"
    />
  );
}
