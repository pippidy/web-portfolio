import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import LoadingSimple from '../LoadingSimple/LoadingSimple';
import Button from '../Buttons/Button/Button';
import SearchBarResults from './SearchBarResults';
import useSearch from '../../../hooks/useSearch';

// @ts-expect-error
import { ReactComponent as SearchIcon } from '../../../assets/svg/search.svg';
// @ts-expect-error
import { ReactComponent as CrossIcon } from '../../../assets/svg/cross.svg';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { data, setData, isSearching, setIsSearching, isLoading, error } =
    useSearch({ query: query });
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const nav = useNavigate();

  // Reset form visually when clicked outside it. Simple onBlur for input didn't work in this particular case
  useOutsideClick(() => {
    formRef.current?.classList.remove('focused');
  }, formRef);

  // Redirecting to game page on submit
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (query) nav(`/search#${query}`);
  }

  function onFocus() {
    formRef.current?.classList.add('focused');
  }

  const onReset = useCallback(() => {
    setData(undefined);
    setIsSearching(false);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [setData, setIsSearching]);

  // Resetting search field and form on page change
  useEffect(() => {
    onReset();
    formRef.current?.classList.remove('focused');
    inputRef.current?.blur();
  }, [location, onReset]);

  return (
    <div className="search">
      <form
        onSubmit={(e) => onSubmit(e)}
        ref={formRef}
        className="search__form"
      >
        <div className="search__inner">
          <label>
            <span className="visually-hidden">search game</span>

            <input
              ref={inputRef}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => onFocus()}
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
              <SearchBarResults data={data} />
            ) : (
              !isLoading &&
              !error && (
                <ul className="search__results-list search__results-list_not-found">
                  <li>No games found</li>
                </ul>
              )
            )}

            {error && (
              <ul className="search__results-list search__results-list_error">
                <li>{error.message}</li>
                <li>Please, try again!</li>
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
