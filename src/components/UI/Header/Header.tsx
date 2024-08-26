import HeaderAuth from './HeaderAuth/HeaderAuth';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import SearchBar from '../SearchBar/SearchBar';

// @ts-expect-error
import logo from '../../../assets/svg/logo.svg';

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
        <HeaderMenu />
      </nav>

      <SearchBar />

      <HeaderAuth />
    </header>
  );
}
