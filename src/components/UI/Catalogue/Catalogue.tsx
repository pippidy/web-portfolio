import { type TSort } from '../../../types/main';
import { type TCatalogueProps } from '../../../types/props';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../Section/Section';
import CardsList from '../CardsList/CardsList';
import CatalogueMenu from './CatalogueMenu/CatalogueMenu';
import { countPaginationOffset } from '../../../utils/utils';
import usePagination from '../../hooks/pagination/usePagination';

export default function Catalogue({
  category,
  endpoint = 'games',
  title,
  fetchLimit = 100,
}: TCatalogueProps) {
  const { id: pageID } = useParams();

  // Creating pagination
  const { paginationUI, pagesCount, currentPage } = usePagination({
    endpoint: endpoint,
    dataFilter: pageID === 'all' ? '' : `where ${category} = ${pageID}`,
  });

  const nav = useNavigate();

  // Redirecting if page is non-existent
  useEffect(() => {
    if (currentPage > pagesCount && pagesCount > 0) {
      nav(`/${endpoint}/${category}/${pageID}#page=${pagesCount}`);
    } else if (currentPage <= 0) {
      nav(`/${endpoint}/${category}/${pageID}#page=1`);
    }
  }, [nav, pagesCount, currentPage, category, endpoint, pageID]);

  const sortRef = useRef<TSort>({
    property: 'aggregated_rating',
    order: 'desc',
  });

  return (
    <Section title={title}>
      <div className="catalogue">
        <div className="catalogue__category-title">Genres</div>

        {/* Menu */}
        <nav className="catalogue__nav" role="menu">
          <CatalogueMenu endpoint={endpoint} category={category} />
        </nav>

        {/* Top pagination */}
        {pagesCount !== 0 && (
          <div className="catalogue__pagination_top">{paginationUI}</div>
        )}

        {/* Main part with cards */}
        <div className="catalogue__main">
          <CardsList
            apiOptions={{
              endpoint: endpoint,
              fields:
                'name,cover.image_id,aggregated_rating,first_release_date',
              limit: fetchLimit,
              filter: pageID === 'all' ? '' : `${category} = ${pageID}`,
              offset: countPaginationOffset(currentPage, fetchLimit),
              sort: sortRef.current,
            }}
            linkPrefix="../"
            cardSize="compact"
          />
        </div>

        {/* Bottom pagination */}
        {pagesCount !== 0 && (
          <div className="catalogue__pagination_bottom">{paginationUI}</div>
        )}
      </div>
    </Section>
  );
}
