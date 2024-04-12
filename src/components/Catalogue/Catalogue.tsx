import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Section from '../Section/Section';
import GameCardsList from '../GameCardsList/GameCardsList';
import { useEffect, useState } from 'react';
import { getDataCount, getCategories } from '../Api/Api';
import { TCatalogue, TCategory } from '../../types/types';
import Pagination from '../Pagination/Pagination';

export default function Catalogue(props: TCatalogue) {
  const { category, endpoint = 'games' } = props;
  const { id: pageID } = useParams();
  const [genres, setGenres] = useState<TCategory[]>();
  const [pagesAmount, setPagesAmount] = useState(0);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const location = useLocation();
  const currentPage = Number(location.hash.match(/[0-9]+/));
  const navigate = useNavigate();
  const fetchLimit = 100;
  const offset = fetchLimit * currentPage;

  if (currentPage > pagesAmount) {
    navigate(`/${endpoint}/${category}/${pageID}#page=${pagesAmount}`);
  }

  useEffect(() => {
    getCategories(category)
      .then((categories) => {
        setGenres(categories);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoadingMenu(false));
  }, [category]);

  useEffect(() => {
    getDataCount({
      endpoint: 'games',
      filter: pageID === 'all' ? '' : `where ${category} = ${pageID}`,
    }).then((data) => {
      setPagesAmount(Math.floor(data.count / fetchLimit));
    });
  }, [pageID, pagesAmount, category]);

  return (
    <Section title="Browse by genre">
      <div className="catalogue">
        <nav className="catalogue__nav">
          {loadingMenu ? (
            <ul className="menu-loading">
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
            <ul className="catalogue-menu">
              <li key="all">
                <NavLink
                  className="catalogue-menu__link"
                  to={`/${endpoint}/${category}/all#page=1`}
                >
                  All
                </NavLink>
              </li>
              {genres
                ? genres.map((genre, index) => {
                    return (
                      <li key={genre.id}>
                        <NavLink
                          className="catalogue-menu__link"
                          to={`/${endpoint}/${category}/${genre.id}#page=1`}
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

        {pagesAmount !== 0 ? (
          <div className="catalogue__pagination_top">
            <Pagination
              keyID="top"
              pagesAmount={pagesAmount}
              currentPage={currentPage}
            />
          </div>
        ) : (
          ''
        )}

        <div className="catalogue__main">
          <GameCardsList
            endpoint={endpoint}
            fields="name,cover.image_id,aggregated_rating,release_dates.*"
            limit={fetchLimit}
            sort="aggregated_rating desc"
            filter={pageID === 'all' ? '' : `${category} = ${pageID}`}
            compact
            offset={offset}
          />
        </div>
        {pagesAmount !== 0 ? (
          <div className="catalogue__pagination_bottom">
            <Pagination
              keyID="top"
              pagesAmount={pagesAmount}
              currentPage={currentPage}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </Section>
  );
}
