import { useEffect, useState } from 'react';
import { getData } from '../Api/Api';
import GameCard from '../GameCard/GameCard';
import { TGame, TGameCardsListProps } from '../../types/types';
import { useLocation } from 'react-router-dom';

export default function GameCardsList(props: TGameCardsListProps) {
  const {
    endpoint = 'games',
    limit,
    sort,
    filter,
    compact,
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
        <div className="game-cards-list__loading">
          <div className="spinner">
            <span className="spinner__text">LOADING...</span>
            <div className="spinner__line"></div>
            <span className="spinner__center"></span>
          </div>
        </div>
      ) : (
        <ul
          className={`game-cards-list ${
            compact ? 'game-cards-list_compact' : ''
          }`}
        >
          {data
            ? data.map((game: TGame) => {
                return (
                  <li className="game-cards-list__item" key={game.id}>
                    <GameCard
                      name={game.name}
                      cover={game.cover}
                      coverSize="cover_big"
                      aggregated_rating={game.aggregated_rating}
                      release_dates={game ? game.release_dates : undefined}
                    />
                  </li>
                );
              })
            : ''}
        </ul>
      )}
    </>
  );
}
