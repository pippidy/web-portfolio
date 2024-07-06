import { type TCatalogueMenuProps, type TCategory } from '../../../types/main';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../../../api/api';
import { catchFetchError } from '../../../utils/utils';

export default function CatalogueMenu({
  category,
  endpoint,
}: TCatalogueMenuProps) {
  const [categoriesList, setCategoriesList] = useState<TCategory[]>();
  const [loading, setLoadingMenu] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getCategories(category, signal)
      .then((categories) => {
        setCategoriesList(categories);
      })
      .catch((error) => {
        catchFetchError(error);
      })
      .finally(() => setLoadingMenu(false));

    return () => {
      controller.abort();
    };
  }, [category]);

  return (
    <>
      {loading ? (
        // Fake menu for loading
        <ul className="catalogue-menu--loading" aria-hidden="true">
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
            categoriesList.map((item) => {
              return (
                <li key={item.id}>
                  <NavLink
                    onClick={() => window.scrollTo(0, 0)}
                    className="catalogue-menu__link"
                    to={`/${endpoint}/${category}/${item.id}#page=1`}
                    title={`Browse ${item.name} category`}
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}
