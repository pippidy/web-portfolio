import { type TCatalogueProps } from '../../types/main';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../Section/Section';
import CardsList from '../CardsList/CardsList';
import Pagination from '../Pagination/Pagination';
import usePagesAmount from '../../hooks/usePagesAmount';
import CatalogueMenu from './CatalogueMenu/CatalogueMenu';

export default function Catalogue({
  category,
  endpoint = 'games',
  title,
}: TCatalogueProps) {
  const { id: pageID } = useParams();

  // Preparing data for pagination
  const { pagesAmount, currentPage } = usePagesAmount({
    endpoint: endpoint,
    pageID: pageID,
    dataFilter: pageID === 'all' ? '' : `where ${category} = ${pageID}`,
  });

  const pagination = (
    <Pagination pagesAmount={pagesAmount} currentPage={currentPage} />
  );

  const nav = useNavigate();
  const fetchLimit = 100;

  // Redirecting if page is non-existent
  useEffect(() => {
    if (currentPage > pagesAmount && pagesAmount > 0) {
      nav(`/${endpoint}/${category}/${pageID}#page=${pagesAmount}`);
    } else if (currentPage <= 0) {
      nav(`/${endpoint}/${category}/${pageID}#page=1`);
    }
  }, [nav, pagesAmount, currentPage, category, endpoint, pageID]);

  return (
    <Section title={title}>
      <div className="catalogue">
        <div className="catalogue__category-title">Genres</div>

        <nav className="catalogue__nav" role="menu">
          <CatalogueMenu endpoint={endpoint} category={category} />
        </nav>

        {/* Top pagination */}
        {pagesAmount !== 0 && (
          <div className="catalogue__pagination_top">{pagination}</div>
        )}

        {/* Main part with cards */}
        <div className="catalogue__main">
          <CardsList
            apiOptions={{
              endpoint: endpoint,
              fields:
                'name,cover.image_id,aggregated_rating,first_release_date',
              limit: fetchLimit,
              sort: 'aggregated_rating desc',
              filter: pageID === 'all' ? '' : `${category} = ${pageID}`,
              offset: fetchLimit * currentPage,
            }}
            linkPrefix="../"
            cardSize="compact"
          />
        </div>

        {/* Bottom pagination */}
        {pagesAmount !== 0 && (
          <div className="catalogue__pagination_bottom">{pagination}</div>
        )}
      </div>
    </Section>
  );
}
