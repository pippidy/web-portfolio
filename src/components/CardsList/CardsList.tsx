import { useEffect, useState } from 'react';
import { getData } from '../Api/Api';
import GameCard from '../Cards/GameCard';
import { TCardsList, TData } from '../../types/types';
import { useLocation } from 'react-router-dom';
import CharacterCard from '../Cards/CharacterCard';
import CompaniesCard from '../Cards/CompaniesCard';
import SectionLoading from '../SectionLoading/SectionLoading';

export default function CardsList({
  endpoint = 'games',
  fields,
  limit,
  sort,
  filter,
  infoLinkPath,
  compact,
  mini,
  offset,
}: TCardsList) {
  const [data, setData] = useState<TData[]>();
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
            ? data.map((data) => {
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
                        infoLinkPath={infoLinkPath}
                        compact={compact ? true : false}
                        mini={mini ? true : false}
                      />
                    ) : endpoint === 'characters' ? (
                      <CharacterCard
                        name={data.name}
                        mug_shot={data.mug_shot}
                        compact={compact ? true : false}
                        mini={mini ? true : false}
                      />
                    ) : endpoint === 'companies' ? (
                      <CompaniesCard
                        name={data.name}
                        logo={data.logo}
                        compact={compact ? true : false}
                        mini={mini ? true : false}
                      />
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
