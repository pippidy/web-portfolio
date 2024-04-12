import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Section from '../Section/Section';
import GameCardsList from '../GameCardsList/GameCardsList';
import { useEffect, useState } from 'react';
import { getCategories } from '../Api/Api';
import { TCatalogue, TCategory } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import usePaginationData from '../../hooks/usePaginationData/usePaginationData';
import { handlePaginationRedirect } from '../Utils/Utils';

export default function Catalogue(props: TCatalogue) {
  const { category, endpoint = 'games' } = props;
  const { id: pageID } = useParams();

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePaginationData({
    pageID: pageID,
    dataFilter: pageID === 'all' ? '' : `where ${category} = ${pageID}`,
  });

  const [categoriesList, setCategoriesList] = useState<TCategory[]>();
  const [loadingMenu, setLoadingMenu] = useState(true);
  const navigate = useNavigate();
  const fetchLimit = 100;
  const offset = fetchLimit * currentPage;

  // Redirecting if wrong page
  handlePaginationRedirect({ nav: navigate, currentPage, pagesAmount });

  // Fetching categories for the menu
  useEffect(() => {
    getCategories(category)
      .then((categories) => {
        setCategoriesList(categories);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoadingMenu(false));
  }, [category]);

  return (
    <Section title="Browse by genre">
      <div className="catalogue">
        <nav className="catalogue__nav">
          {loadingMenu ? (
            /* Fake menu for loading */
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
            /* Actual catalogue menu */
            <ul className="catalogue-menu">
              <li key="all">
                <NavLink
                  className="catalogue-menu__link"
                  to={`/${endpoint}/${category}/all#page=1`}
                >
                  All
                </NavLink>
              </li>
              {categoriesList
                ? categoriesList.map((genre, index) => {
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

        {/* Top pagination */}
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

        {/* Main part with cards */}
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

        {/* Bottom pagination */}
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
