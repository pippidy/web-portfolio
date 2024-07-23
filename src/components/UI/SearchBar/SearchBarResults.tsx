import { type TDataGame } from '../../../types/data';
import { Link } from 'react-router-dom';
import { cutLongString } from '../../../utils/utils';

export default function SearchBarResults({ data }: { data: TDataGame[] }) {
  return (
    <ul className="search__results-list">
      {data.map((item, index) => {
        return (
          <li key={`search_${index}`}>
            <Link
              className="search__results-link"
              to={`game/${item.id}`}
              title={item.name}
              aria-label={`Info page for game ${item.name}`}
            >
              {item.cover && (
                <img
                  src={item.cover.url}
                  alt={`Search preview for ${item.name}`}
                />
              )}
              {item.name && cutLongString({ string: item.name, length: 45 })}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
