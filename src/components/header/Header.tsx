import { Link, NavLink } from 'react-router-dom';
import Search from '../Search/Search';
// @ts-expect-error
import logo from '../../assets/svg/logo.svg';
// @ts-expect-error
import { ReactComponent as PersonIcon } from '../../assets/svg/person.svg';

export default function Header() {
  return (
    <header className="header block-default block-default_shadowDown">
      <a href="/" className="logo" title="logo">
        <img src={logo} alt="" />
      </a>

      <nav className="header__nav">
        <ul className="menu-main">
          <li>
            <NavLink
              className="menu-main__item menu-main__item_clickable"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <div className="menu-main__item menu-main__submenu">
              <span className="menu-main__submenu-name">Games</span>
              <div className="menu-main__submenu-holder">
                <ul className="menu-main__submenu-list">
                  <li className="menu-main__submenu-item">
                    <Link to="games/genres/all#page=1">Genres</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <Link className="menu-main__item menu-main__item_clickable" to="/">
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <Search />

      <button className="button-auth">
        <PersonIcon className="button-auth__svg" width="25px" height="25px" />
      </button>
    </header>
  );
}
