import { type TCardsRenderProps } from '../../../types/props';
import SectionLoading from '../Section/SectionLoading/SectionLoading';
import GameCard from '../Cards/GameCard';
import CharacterCard from '../Cards/CharacterCard';
import CompanyCard from '../Cards/CompanyCard';
import cn from 'classnames';
import DataNotAvailable from '../DataNotAvailable/DataNotAvailable';
import DataError from '../DataError/DataError';

export default function CardsRender({
  data,
  loading,
  error,
  cardType,
  cardSize = 'default',
  linkPrefix = '',
}: TCardsRenderProps) {
  const mainClass = cn('cards-list', {
    'cards-list_compact': cardSize === 'compact',
    'cards-list_mini': cardSize === 'mini',
  });

  return (
    <>
      {loading ? (
        <SectionLoading />
      ) : data && data.length > 0 ? (
        <ul className={mainClass}>
          {data.map((data) => {
            return (
              <li className="cards-list__item" key={data.id}>
                {cardType === 'games' ? (
                  <GameCard
                    id={data.id}
                    name={data.name}
                    cover={data?.cover}
                    coverSize="cover_big"
                    aggregated_rating={data?.aggregated_rating}
                    first_release_date={data && data.first_release_date}
                    linkPrefix={linkPrefix}
                    cardSize={cardSize}
                  />
                ) : cardType === 'characters' ? (
                  <CharacterCard
                    id={data.id}
                    name={data.name}
                    mug_shot={data.mug_shot}
                    cardSize={cardSize}
                    linkPrefix={linkPrefix}
                  />
                ) : (
                  cardType === 'companies' && (
                    <CompanyCard
                      id={data.id}
                      name={data.name}
                      logo={data.logo}
                      cardSize={cardSize}
                      linkPrefix={linkPrefix}
                    />
                  )
                )}
              </li>
            );
          })}
        </ul>
      ) : error ? (
        <DataError error={error} />
      ) : (
        <DataNotAvailable text="No data available. Try again later!" /> // When data object is empty but there's no error
      )}
    </>
  );
}
