import { NavLink } from 'react-router-dom';
import HeaderSubmenu from './HeaderSubmenuItem';

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
        <HeaderSubmenu title="Browse">
          <NavLink to="games/genres/all#page=1" title="Browse genres">
            Genres
          </NavLink>

          <NavLink to="/characters#page=1" title="Browse characters">
            Characters
          </NavLink>

          <NavLink to="/companies#page=1" title="Browse companies">
            Companies
          </NavLink>
        </HeaderSubmenu>
      </li>
      <li>
        <HeaderSubmenu title="About">
          <NavLink to="about" title="Go to About page">
            About
          </NavLink>

          <NavLink to="/contacts" title="Go to Contacts page">
            Contacts
          </NavLink>
        </HeaderSubmenu>
      </li>
    </ul>
  );
}
