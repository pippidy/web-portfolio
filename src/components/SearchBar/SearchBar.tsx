import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getData } from '../Api/Api';
import { TGame } from '../../types/types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useOutsideClick from '../../hooks/useOutsideClick';
import { cutLongString } from '../Utils/Utils';

// @ts-expect-error
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg';
// @ts-expect-error
import { ReactComponent as CrossIcon } from '../../assets/svg/cross.svg';

export default function SearchBar() {
  const [data, setData] = useState<TGame[] | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Reset the form visually when clicked outside it. Simple onBlur for input didn't work in this case
  useOutsideClick(() => {
    formRef.current?.classList.remove('focused'); // Used for better control over the block with results and styling
    setIsSearching(false);
  }, formRef);

  // Redirecting to game page on submit
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (searchQuery) navigate(`/search#${searchQuery}`);
  }

  // Initializing search by resetting current Data and sending new request if needed
  // You're able to reset search by passing an empty string
  function initSearch(query: string) {
    setData(undefined);

    if (query.length > 0) {
      setIsSearching(true);

      if (query.length > 1) {
        setIsLoading(true);

        getData({
          endpoint: 'games',
          search: query,
          fields: 'name,cover.url',
          limit: 5,
        })
          .then((data) => {
            setData(data);
          })
          .catch((err) => console.log(`Error: ${err}`))
          .finally(() => setIsLoading(false));
      }
    } else {
      setIsSearching(false);
    }
  }

  // Resetting search proccess and clearing the input
  const handleReset = useCallback(() => {
    initSearch('');
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  // Resetting search field on page change
  useEffect(() => {
    handleReset();
    formRef.current?.classList.remove('focused');
  }, [location, handleReset]);

  // Sending request only when user stopped typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      initSearch(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="search">
      <form
        onSubmit={(e) => handleSubmit(e)}
        ref={formRef}
        className="search__form"
      >
        <div className="search__inner">
          <label>
            <span className="visually-hidden">game search</span>

            <input
              ref={inputRef}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={(e) => {
                formRef.current?.classList.add('focused');
                initSearch(e.target.value);
              }}
              type="text"
              className="search__input"
              placeholder="Search for games..."
              name="search"
            />
          </label>

          {isLoading && (
            <div className="search__loading">
              <div className="loading-simple"></div>
            </div>
          )}

          <button
            type="submit"
            className="search__button search__button_submit"
            title="Submit search"
          >
            <SearchIcon className="search__svg" />
          </button>

          {isSearching && (
            <button
              onClick={handleReset}
              type="reset"
              className="search__button search__button_reset"
              title="Reset search"
            >
              <CrossIcon className="search__svg" />
            </button>
          )}

          <div className={`search__results ${isSearching ? 'active' : ''}`}>
            {data && (
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
                        {item.name &&
                          cutLongString({ string: item.name, length: 48 })}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
