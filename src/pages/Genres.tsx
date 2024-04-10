import { NavLink, useLocation, useParams } from 'react-router-dom';
import Section from '../components/Section/Section';
import GameCardsList from '../components/GameCardsList/GameCardsList';
import { useEffect, useState } from 'react';
import { getGamesCount, getGenres } from '../components/Api/Api';
import { TGenre } from '../types/types';
import Pagination from '../components/Pagination/Pagination';

export default function Genres() {
  const { id } = useParams();
  const [genres, setGenres] = useState<TGenre[]>();
  const [pagesAmount, setPagesAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const currentPage = Number(location.hash.match(/[0-9]+/));
  const fetchLimit = 100;
  const offset = fetchLimit * currentPage;

  useEffect(() => {
    getGenres()
      .then((genres) => {
        setGenres(genres);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getGamesCount({ id: id, query: 'genres' }).then((data) => {
      setPagesAmount(Math.floor(data.count / fetchLimit));
    });
  }, [id, pagesAmount]);

  return (
    <Section title="Browse by genre">
      <div className="section-catalogue">
        <nav className="section-catalogue__nav">
          {loading ? (
            <ul className="section-menu-loading">
              <li>Loading...</li>
              <li>Loading...</li>
              <li>Loading...</li>
              <li>Loading...</li>
              <li>Loading...</li>
              <li>Loading...</li>
              <li>Loading...</li>
              <li>Loading...</li>
            </ul>
          ) : (
            <ul className="section-menu">
              {genres
                ? genres.map((genre, index) => {
                    if (index === 0) {
                      return (
                        <li key="all">
                          <NavLink
                            className="section-menu__link"
                            to={`/games/genres/all#page=1`}
                          >
                            All
                          </NavLink>
                        </li>
                      );
                    }

                    return (
                      <li key={genre.id}>
                        <NavLink
                          className="section-menu__link"
                          to={`/games/genres/${genre.id}#page=1`}
                        >
                          {genre.name}
                        </NavLink>
                      </li>
                    );
                  })
                : ''}
            </ul>
          )}
        </nav>

        <div className="section-catalogue__pagination_top">
          <Pagination id="top" pagesAmount={pagesAmount} />
        </div>

        <div className="section-catalogue__main">
          <GameCardsList
            limit={fetchLimit}
            sort="aggregated_rating desc"
            filter={id === 'all' ? '' : `genres = ${id}`}
            compact
            offset={offset}
          />
        </div>

        <div className="section-catalogue__pagination_bottom">
          <Pagination id="top" pagesAmount={pagesAmount} />
        </div>
      </div>
    </Section>
  );
}
