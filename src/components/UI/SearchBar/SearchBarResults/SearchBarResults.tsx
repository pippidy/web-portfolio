import { type TDataGame } from '../../../../types/data';
import { type TError } from '../../../../types/main';
import { Link } from 'react-router-dom';

type TSearchBarResults = {
  data: TDataGame[] | null | undefined;
  error: TError | undefined;
  isSearching: boolean;
  isLoading: boolean;
};

export default function SearchBarResults({
  data,
  error,
  isSearching,
  isLoading,
}: TSearchBarResults) {
  return (
    <div className={`search-results ${isSearching ? 'active' : ''}`}>
      {data && data.length > 0 ? (
        <ul className="search-results-list">
          {data.map((item, index) => {
            return (
              <li className="search-results__item" key={`search_${index}`}>
                <Link
                  className="search-results__item-link"
                  to={`game/${item.id}`}
                  title={item.name}
                  aria-label={`Info page for game ${item.name}`}
                >
                  {item.cover && (
                    <img
                      className="search-results__item-link-image"
                      src={`//images.igdb.com/igdb/image/upload/t_thumb/${item.cover.image_id}.jpg`}
                      alt={`Search preview for ${item.name}`}
                    />
                  )}
                  <span className="search-results__item-link-text">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        !isLoading &&
        !error && (
          <ul className="search-results-list search-results-list_not-found">
            <li>No games found</li>
          </ul>
        )
      )}

      {error && (
        <ul className="search-results-list search-results-list_error">
          <li>{error.message}</li>
          <li>Please, try again!</li>
        </ul>
      )}
    </div>
  );
}
