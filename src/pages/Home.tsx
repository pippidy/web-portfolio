import GameCardsList from '../components/GameCardsList/GameCardsList';
import Section from '../components/Section/Section';

export default function Home() {
  const filter = 'aggregated_rating > 0;';
  const fields = 'name,cover.image_id,aggregated_rating,release_dates.*';

  return (
    <>
      <Section title="Recent releases">
        <GameCardsList
          fields={fields}
          limit={6}
          sort={'first_release_date desc'}
          filter={filter}
        />
      </Section>

      <Section title="Most rated games">
        <GameCardsList
          fields={fields}
          limit={6}
          sort={'aggregated_rating desc'}
          filter={filter}
        />
      </Section>

      <Section title="Least rated games">
        <GameCardsList
          fields={fields}
          limit={6}
          sort={'aggregated_rating asc'}
          filter={filter}
        />
      </Section>
    </>
  );
}
