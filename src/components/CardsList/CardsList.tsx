import { type TCardsListProps } from '../../types/cards';
import GameCard from './Cards/GameCard';
import CharacterCard from './Cards/CharacterCard';
import CompanyCard from './Cards/CompanyCard';
import SectionLoading from '../Section/SectionLoading/SectionLoading';
import DataNotAvailable from '../DataNotAvailable/DataNotAvailable';
import useGetData from '../../hooks/useGetData';
import cn from 'classnames';

export default function CardsList({
  apiOptions,
  linkPrefix,
  cardSize = 'default',
}: TCardsListProps) {
  const { endpoint } = apiOptions;
  const { data, loading } = useGetData({
    ...apiOptions,
  });

  const classCardList = cn('cards-list', {
    'cards-list_compact': cardSize === 'compact',
    'cards-list_mini': cardSize === 'mini',
  });

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
