import CardsList from '../../UI/CardsList/CardsList';
import Section from '../../UI/Section/Section';

export default function Home() {
  const filter = 'aggregated_rating > 0;';
  const fields = 'name,cover.image_id,aggregated_rating,first_release_date';

  return (
    <>
      <Section title="Recent releases">
        <CardsList
          apiOptions={{
            endpoint: 'games',
            fields: fields,
            limit: 6,
            sort: {
              property: 'first_release_date',
              order: 'desc',
            },
            filter: filter,
          }}
        />
      </Section>

      <Section title="Most rated games">
        <CardsList
          apiOptions={{
            endpoint: 'games',
            fields: fields,
            limit: 6,
            sort: {
              property: 'aggregated_rating',
              order: 'desc',
            },
            filter: filter,
          }}
        />
      </Section>

      <Section title="Least rated games">
        <CardsList
          apiOptions={{
            endpoint: 'games',
            fields: fields,
            limit: 6,
            sort: {
              property: 'aggregated_rating',
              order: 'asc',
            },
            filter: filter,
          }}
        />
      </Section>
    </>
  );
}
