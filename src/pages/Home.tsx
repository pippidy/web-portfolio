import GameCardsList from '../components/GameCardsList/GameCardsList';
import Section from '../components/Section/Section';

export default function Home() {
  const filter = 'aggregated_rating > 0;';

  return (
    <>
      <Section title="Recent releases">
        <GameCardsList
          limit={6}
          sort={'first_release_date desc'}
          filter={filter}
        />
      </Section>

      <Section title="Most rated games">
        <GameCardsList
          limit={6}
          sort={'aggregated_rating desc'}
          filter={filter}
        />
      </Section>

      <Section title="Least rated games">
        <GameCardsList
          limit={6}
          sort={'aggregated_rating asc'}
          filter={filter}
        />
      </Section>
    </>
  );
}
