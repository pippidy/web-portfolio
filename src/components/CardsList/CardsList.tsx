import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TDataFull } from '../../types/data';
import { TCardsListProps } from '../../types/cards';
import { getData } from '../../api/api';
import GameCard from '../Card/GameCard';
import CharacterCard from '../Card/CharacterCard';
import CompanyCard from '../Card/CompanyCard';
import SectionLoading from '../Section/SectionLoading/SectionLoading';
import cn from 'classnames';
import DataNotAvailable from '../DataNotAvailable/DataNotAvailable';
import { catchFetchError } from '../../utils/utils';

export default function CardsList({
  endpoint = 'games',
  search,
  fields = '*',
  limit,
  sort,
  filter,
  linkPrefix,
  cardSize = 'default',
  offset,
}: TCardsListProps) {
  const [data, setData] = useState<TDataFull[]>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Main classes
  const classCardList = cn('cards-list', {
    'cards-list_compact': cardSize === 'compact',
    'cards-list_mini': cardSize === 'mini',
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // TODO: Maybe move it to a custom hook
    getData({
      endpoint: endpoint,
      search: search,
      fields: fields,
      limit: limit,
      sort: sort,
      filter: filter,
      offset: offset,
      signal: signal,
    })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        catchFetchError(error);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [endpoint, search, fields, limit, sort, filter, offset]);

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
                    first_release_date={
                      data ? data.first_release_date : undefined
                    }
                    linkPrefix={linkPrefix}
                    cardSize={cardSize}
                  />
                ) : endpoint === 'characters' ? (
                  <CharacterCard
                    id={data.id}
                    name={data.name}
                    mug_shot={data.mug_shot}
                    cardSize={cardSize}
                    linkPrefix={linkPrefix}
                  />
                ) : endpoint === 'companies' ? (
                  <CompanyCard
                    id={data.id}
                    name={data.name}
                    logo={data.logo}
                    cardSize={cardSize}
                    linkPrefix={linkPrefix}
                  />
                ) : (
                  <DataNotAvailable text="No data available." />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <DataNotAvailable text="No data available." />
      )}
    </>
  );
}
