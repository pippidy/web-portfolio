import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Section from '../Section/Section';
import CardsList from '../CardsList/CardsList';
import { useEffect, useState } from 'react';
import { getCategories } from '../../api/api';
import { TCatalogue, TCategory } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import usePaginationData from '../../hooks/usePaginationData';
import { catchFetchError } from '../../utils/utils';

export default function Catalogue({
  category,
  endpoint = 'games',
  title,
}: TCatalogue) {
  const { id: pageID } = useParams();

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePaginationData({
    endpoint: endpoint,
    pageID: pageID,
    dataFilter: pageID === 'all' ? '' : `where ${category} = ${pageID}`,
  });

  const nav = useNavigate();
  const [categoriesList, setCategoriesList] = useState<TCategory[]>();
  const [loadingMenu, setLoadingMenu] = useState(true);
  const fetchLimit = 100;

  // Redirecting if page is non-existent
  useEffect(() => {
    if (currentPage > pagesAmount && pagesAmount > 0) {
      nav(`/${endpoint}/${category}/${pageID}#page=${pagesAmount}`);
    } else if (currentPage <= 0) {
      nav(`/${endpoint}/${category}/${pageID}#page=1`);
    }
  }, [nav, pagesAmount, currentPage, category, endpoint, pageID]);

  // Fetching categories for catalogue menu
  useEffect(() => {
    getCategories(category)
      .then((categories) => {
        setCategoriesList(categories);
      })
      .catch((error) => {
        catchFetchError(error);
      })
      .finally(() => setLoadingMenu(false));
  }, [category]);

  return (
    <Section title={title}>
      <div className="catalogue">
        <div className="catalogue__category-title">Genres</div>
        <nav className="catalogue__nav" role="menu">
          {loadingMenu ? (
            // Fake menu for loading
            <ul className="menu-loading" aria-hidden="true">
              <li>Loading...</li>
              <li>Loading...</li>
              <li>Loading...</li>
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
            // Actual catalogue menu
            <ul className="catalogue-menu">
              <li key="all">
                <NavLink
                  className="catalogue-menu__link"
                  to={`/${endpoint}/${category}/all#page=1`}
                  onClick={() => window.scrollTo(0, 0)}
                  title="Browse all genres"
                >
                  All
                </NavLink>
              </li>
              {categoriesList &&
                categoriesList.map((genre) => {
                  return (
                    <li key={genre.id}>
                      <NavLink
                        onClick={() => window.scrollTo(0, 0)}
                        className="catalogue-menu__link"
                        to={`/${endpoint}/${category}/${genre.id}#page=1`}
                        title={`Browse ${genre.name} genre`}
                      >
                        {genre.name}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          )}
        </nav>

        {/* Top pagination */}
        {pagesAmount !== 0 && (
          <div className="catalogue__pagination_top">
            <Pagination
              keyID="top"
              pagesAmount={pagesAmount}
              currentPage={currentPage}
            />
          </div>
        )}

        {/* Main part with cards */}
        <div className="catalogue__main">
          <CardsList
            endpoint={endpoint}
            fields="name,cover.image_id,aggregated_rating,first_release_date"
            limit={fetchLimit}
            sort="aggregated_rating desc"
            filter={pageID === 'all' ? '' : `${category} = ${pageID}`}
            offset={fetchLimit * currentPage}
            linkPrefix="../"
            cardSize="compact"
          />
        </div>

        {/* Bottom pagination */}
        {pagesAmount !== 0 && (
          <div className="catalogue__pagination_bottom">
            <Pagination
              keyID="top"
              pagesAmount={pagesAmount}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </Section>
  );
}
