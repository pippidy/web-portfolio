import { useEffect, useState } from 'react';
import { getData } from '../Api/Api';
import GameCard from '../Cards/GameCard';
import { TCharacter, TCompany, TGame, TGameCardsList } from '../../types/types';
import { useLocation } from 'react-router-dom';
import CharacterCard from '../Cards/CharacterCard';
import CompaniesCard from '../Cards/CompaniesCard';
import SectionLoading from '../SectionLoading/SectionLoading';

export default function CardsList(props: TGameCardsList) {
  const {
    endpoint = 'games',
    limit,
    sort,
    filter,
    compact,
    mini,
    offset,
    fields,
  } = props;
  const [data, setData] = useState<TGame[]>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getData({
      endpoint: endpoint,
      fields,
      limit: limit,
      sort: sort,
      filter: filter,
      offset: offset,
    })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoading(false));
  }, [endpoint, fields, limit, sort, filter, offset]);

  useEffect(() => {
    setLoading(true);
  }, [location]);

  return (
    <>
      {loading ? (
        <SectionLoading />
      ) : (
        <ul
          className={`cards-list ${
            compact ? 'cards-list_compact' : `${mini ? 'cards-list_mini' : ''}`
          }`}
        >
          {data
            ? data.map((data: TGame & TCharacter & TCompany) => {
                return (
                  <li className="cards-list__item" key={data.id}>
                    {endpoint === 'games' ? (
                      <GameCard
                        id={data.id}
                        name={data.name}
                        cover={data?.cover}
                        coverSize="cover_big"
                        aggregated_rating={data?.aggregated_rating}
                        release_dates={data ? data.release_dates : undefined}
                      />
                    ) : endpoint === 'characters' ? (
                      <CharacterCard
                        name={data.name}
                        mug_shot={data.mug_shot}
                      />
                    ) : endpoint === 'companies' ? (
                      <CompaniesCard name={data.name} logo={data.logo} />
                    ) : (
                      ''
                    )}
                  </li>
                );
              })
            : ''}
        </ul>
      )}
    </>
  );
}
