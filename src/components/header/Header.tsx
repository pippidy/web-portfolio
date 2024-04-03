import { Link } from "react-router-dom";
import Search from "../search/Search";
// @ts-expect-error
import logo from "../../assets/svg/logo.svg";
// @ts-expect-error
import { ReactComponent as PersonIcon } from "../../assets/svg/person.svg";

export default function Header() {
  return (
    <header className="header blockDefault">
      <a href="/" className="logo">
        <img src={logo} alt="" />
      </a>

      <nav>
        <ul className="menuMain">
          <li>
            <Link className="menuMain__item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="menuMain__item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="menuMain__item" to="/">
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <Search />

      <button className="buttonAuth">
        <PersonIcon className="buttonAuth__svg" />
      </button>
    </header>
  );
}
