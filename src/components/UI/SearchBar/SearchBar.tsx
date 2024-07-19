import { type TDataGame } from '../../../types/data';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getData } from '../../../api/api';
import useOutsideClick from '../../../hooks/useOutsideClick';
import LoadingSimple from '../LoadingSimple/LoadingSimple';
import { catchFetchError, cutLongString } from '../../../utils/utils';
import Button from '../Buttons/Button/Button';

// @ts-expect-error
import { ReactComponent as SearchIcon } from '../../../assets/svg/search.svg';
// @ts-expect-error
import { ReactComponent as CrossIcon } from '../../../assets/svg/cross.svg';

export default function SearchBar() {
  const [data, setData] = useState<TDataGame[] | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const nav = useNavigate();

  // Reset form visually when clicked outside it. Simple onBlur for input didn't work in this case
  useOutsideClick(() => {
    formRef.current?.classList.remove('focused');
    setIsSearching(false);
  }, formRef);

  // Redirecting to game page on submit
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (searchQuery) nav(`/search#${searchQuery}`);
  }

  // Initializing search by resetting current data and sending new request if needed
  // You're able to reset search by passing an empty string
  function initSearch(query: string) {
    setData(undefined);

    if (query.length > 0) {
      setIsSearching(true);

      if (query.length > 2) {
        setIsLoading(true);

        getData({
          apiOptions: {
            endpoint: 'games',
            search: query,
            fields: 'name,cover.url',
            limit: 5,
          },
        })
          .then((data) => {
            setData(data);
          })
          .catch((error) => {
            catchFetchError(error);
          })
          .finally(() => setIsLoading(false));
      }
    } else {
      setIsSearching(false);
    }
  }

  // Resetting search proccess and clearing the input
  const onReset = useCallback(() => {
    initSearch('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  // Resetting search field and form on page change
  useEffect(() => {
    onReset();
    formRef.current?.classList.remove('focused');
  }, [location, onReset]);

  // Sending request only when user stopped typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      initSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="search">
      <form
        onSubmit={(e) => onSubmit(e)}
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
              placeholder="Search games..."
              name="search"
            />
          </label>

          {isLoading && (
            <div className="search__loading">
              <LoadingSimple />
            </div>
          )}

          <Button
            type="submit"
            className="search__button search__button_submit"
            title="Submit search"
          >
            <SearchIcon className="search__svg" />
          </Button>

          <Button
            onClick={() => {
              onReset();
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            type="reset"
            className={`search__button search__button_reset ${
              isSearching ? 'active' : ''
            }`}
            title="Reset search"
          >
            <CrossIcon className="search__svg" />
          </Button>

          <div className={`search__results ${isSearching ? 'active' : ''}`}>
            {data && data.length > 0 ? (
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
                          cutLongString({ string: item.name, length: 45 })}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              !isLoading && (
                <ul className="search__results-list search__results-list_not-found">
                  <li>No games found</li>
                </ul>
              )
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
