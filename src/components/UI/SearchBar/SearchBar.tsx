import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSimple from '../LoadingSimple/LoadingSimple';
import SearchBarResults from './SearchBarResults/SearchBarResults';
import useSearch from '../../hooks/useSearch';
import useOutsideClick from '../../hooks/useOutsideClick';
import useKey from '../../hooks/useKey';
import cn from 'classnames';

// @ts-expect-error
import { ReactComponent as SearchIcon } from '../../../assets/svg/search.svg';
// @ts-expect-error
import { ReactComponent as CrossIcon } from '../../../assets/svg/cross.svg';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { data, setData, isSearching, setIsSearching, isLoading, error } =
    useSearch({ query: query, limit: 20 });
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();
  const nav = useNavigate();

  function onFocus() {
    setIsFocused(true);
    document.body.classList.add('overlay', 'overflow-hidden');
  }

  // Unfocus input
  function onBlur() {
    if (isFocused) {
      setIsFocused(false);
      inputRef.current?.blur();
      document.body.classList.remove('overlay', 'overflow-hidden');
    }
  }

  // Unfocus with Escape
  useKey({
    key: 'Escape',
    event: 'keyup',
    callback: () => onBlur(),
  });

  const onReset = useCallback(() => {
    setData(null);
    setIsSearching(false);
    setQuery('');
  }, [setData, setIsSearching]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  // Reset form visually when clicked outside it. Simple onBlur for the input didn't work in this particular case
  useOutsideClick(() => isFocused && onBlur(), formRef);

  // Redirecting to search page on submit
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (query) nav(`/search#${query}`);
  }

  // Resetting search field and form on page change
  useEffect(() => {
    if (query.length > 0) onReset();
    if (isFocused) onBlur();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, onReset]);

  return (
    <div className="search">
      <form
        onSubmit={(e) => onSubmit(e)}
        ref={formRef}
        className={cn('search__form', { focused: isFocused })}
      >
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className={cn('search__button', { visible: query })}
          title="Submit search"
        >
          Submit
        </button>

        <div className="search__inner">
          <label>
            <span className="visually-hidden">search game</span>

            {/* SEARCH FIELD */}
            <input
              ref={inputRef}
              onChange={onChange}
              onFocus={() => onFocus()}
              type="text"
              className="search__input"
              placeholder="Search games..."
              name="search"
              value={query}
            />
          </label>

          {/* LOADING */}
          {isLoading && (
            <div className="search__loading">
              <LoadingSimple />
            </div>
          )}

          {/* SEARCH ICON */}
          <div className="search__icon search__icon_search">
            <SearchIcon className="search__svg" />
          </div>

          {/* RESET BUTTON */}
          <button
            onClick={() => {
              onReset();
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            type="reset"
            className={`search__icon search__icon_reset ${
              isSearching ? 'active' : ''
            }`}
            title="Reset search"
          >
            <CrossIcon className="search__svg" />
          </button>

          {/* SEARCH RESULTS */}
          <SearchBarResults
            data={data}
            error={error}
            isSearching={isSearching}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
