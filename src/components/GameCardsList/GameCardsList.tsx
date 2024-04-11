import { useEffect, useState } from 'react';
import { getGames } from '../Api/Api';
import GameCard from '../GameCard/GameCard';
import { TGame, TGameCardsListProps } from '../../types/types';
import { useLocation } from 'react-router-dom';

export default function GameCardsList(props: TGameCardsListProps) {
  const { limit, sort, filter, compact, offset = 52 } = props;
  const [games, setGames] = useState<TGame[]>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getGames({ limit: limit, sort: sort, filter: filter, offset: offset })
      .then((games) => {
        setGames(games);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoading(false));
  }, [loading, limit, sort, filter, offset]);

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
          {games
            ? games.map((game: TGame) => {
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
