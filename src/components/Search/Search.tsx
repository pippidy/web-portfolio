// @ts-expect-error
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";

export default function Search() {
  return (
    <form className="formSearch">
      <input
        type="text"
        className="formSearch__input"
        placeholder="Search..."
        name="search"
      />
      <button
        type="submit"
        className="formSearch__submit"
        title="submit search"
      >
        <SearchIcon className="formSearch__svg" />
      </button>
    </form>
  );
}
