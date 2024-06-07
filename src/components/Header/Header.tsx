import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
// @ts-expect-error
import logo from '../../assets/svg/logo.svg';
import HeaderAuth from './HeaderAuth/HeaderAuth';

export default function Header() {
  return (
    <header
      className="header block-default block-default_shadowDown"
      aria-label="Site header"
    >
      <a href="/" className="logo" title="logo">
        <img src={logo} alt="" />
      </a>

      <nav className="header__nav" role="menu">
        <ul className="menu-main">
          <li>
            <NavLink
              className="menu-main__item menu-main__item_clickable"
              to="/"
              title="Go to Homepage"
            >
              Home
            </NavLink>
          </li>
          <li>
            <div className="menu-main__item menu-main__submenu" tabIndex={0}>
              <span className="menu-main__submenu-name">Browse</span>
              <div className="menu-main__submenu-holder">
                <ul className="menu-main__submenu-list">
                  <li className="menu-main__submenu-item">
                    <Link to="games/genres/all#page=1" title="Browse genres">
                      Genres
                    </Link>
                  </li>
                  <li className="menu-main__submenu-item">
                    <Link to="/characters#page=1" title="Browse characters">
                      Characters
                    </Link>
                  </li>
                  <li className="menu-main__submenu-item">
                    <Link to="/companies#page=1" title="Browse companies">
                      Companies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <Link
              className="menu-main__item menu-main__item_clickable"
              to="/about"
              title="Browse About page"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      <SearchBar />
      <HeaderAuth />
    </header>
  );
}
