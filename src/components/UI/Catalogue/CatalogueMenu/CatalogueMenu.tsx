import { type TCategory } from '../../../../types/main';
import { type TCatalogueMenuProps } from '../../../../types/props';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../../../api/api';
import { handleError } from '../../../../utils/utils';

export default function CatalogueMenu({
  category,
  endpoint,
}: TCatalogueMenuProps) {
  const [categoriesList, setCategoriesList] = useState<TCategory[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    getCategories({ category, signal: controller.signal })
      .then((categories) => {
        setCategoriesList(categories);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => setLoading(false));

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

          {categoriesList?.map((item) => {
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
