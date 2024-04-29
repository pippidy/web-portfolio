import { useEffect, useState } from 'react';
import { getData } from '../Api/Api';
import GameCard from '../Card/GameCard';
import { TCardsList, TData } from '../../types/types';
import { useLocation } from 'react-router-dom';
import CharacterCard from '../Card/CharacterCard';
import CompaniesCard from '../Card/CompaniesCard';
import SectionLoading from '../SectionLoading/SectionLoading';
import cn from 'classnames';
import DataNotAvailable from '../DataNotAvailable/DataNotAvailable';

export default function CardsList({
  endpoint = 'games',
  fields = '*',
  limit,
  sort,
  filter,
  infoLinkPath: linkPath,
  cardSize = 'default',
  offset,
}: TCardsList) {
  const [data, setData] = useState<TData[]>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Classnames
  const classCardList = cn('cards-list', {
    'cards-list_compact': cardSize === 'compact',
    'cards-list_mini': cardSize === 'mini',
  });

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
      ) : data && data.length > 0 ? (
        <ul className={classCardList}>
          {data.map((data) => {
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
                    linkPath={linkPath}
                    cardSize={cardSize}
                  />
                ) : endpoint === 'characters' ? (
                  <CharacterCard
                    name={data.name}
                    mug_shot={data.mug_shot}
                    cardSize={cardSize}
                  />
                ) : endpoint === 'companies' ? (
                  <CompaniesCard
                    name={data.name}
                    logo={data.logo}
                    cardSize={cardSize}
                  />
                ) : (
                  ''
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <DataNotAvailable />
      )}
    </>
  );
}
