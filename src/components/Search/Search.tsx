import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getData } from '../Api/Api';
import { TData } from '../../types/types';
import { Link, useLocation } from 'react-router-dom';

// @ts-expect-error
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg';
// @ts-expect-error
import { ReactComponent as CrossIcon } from '../../assets/svg/cross.svg';
import useOutsideClick from '../../hooks/useOutsideClick';

export default function Search() {
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState<TData[] | undefined>();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useOutsideClick(() => {
    formRef.current?.classList.remove('focused');
    setIsSearching(false);
  }, formRef);

  function initSearch(val: string) {
    if (val.length > 2) {
      getData({
        endpoint: 'games',
        search: val,
        fields: 'name,cover.url',
        limit: 5,
      }).then((data) => {
        setData(data);
      });

      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    initSearch(e.target.value);
  }

  function handleReset() {
    initSearch('');
    if (inputRef.current) inputRef.current.value = '';
  }

  useEffect(() => {
    handleReset();
    formRef.current?.classList.remove('focused');
  }, [location]);

  return (
    <div className="search">
      <form ref={formRef} className="search__form">
        <div className="search__inner">
          <label>
            <span className="visually-hidden">game search</span>
            <input
              ref={inputRef}
              onChange={(e) => handleInputChange(e)}
              onFocus={(e) => {
                formRef.current?.classList.add('focused');
                handleInputChange(e);
              }}
              type="text"
              className="search__input"
              placeholder="Search for games..."
              name="search"
            />
          </label>
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
          {data && (
            <div className={`search__results ${isSearching ? 'active' : ''}`}>
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
                        <img
                          src={item.cover && item.cover.url}
                          alt={`Search preview for ${item.name}`}
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
