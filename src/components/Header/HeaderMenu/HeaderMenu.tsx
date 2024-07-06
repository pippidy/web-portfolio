import { Link, NavLink } from 'react-router-dom';

export default function HeaderMenu() {
  return (
    <ul className="menu-header">
      <li>
        <NavLink
          className="menu-header__item menu-header__item_clickable"
          to="/"
          title="Go to Homepage"
        >
          Home
        </NavLink>
      </li>
      <li>
        <div className="menu-header__item menu-header__submenu" tabIndex={0}>
          <span className="menu-header__submenu-name">Browse</span>
          <div className="menu-header__submenu-holder">
            <ul className="menu-header__submenu-list">
              <li className="menu-header__submenu-item">
                <Link to="games/genres/all#page=1" title="Browse genres">
                  Genres
                </Link>
              </li>
              <li className="menu-header__submenu-item">
                <Link to="/characters#page=1" title="Browse characters">
                  Characters
                </Link>
              </li>
              <li className="menu-header__submenu-item">
                <Link to="/companies#page=1" title="Browse companies">
                  Companies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <NavLink
          className="menu-header__item menu-header__item_clickable"
          to="/about"
          title="Browse About page"
        >
          About
        </NavLink>
      </li>
    </ul>
  );
}
