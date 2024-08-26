import { THeaderSubmenuProps as THeaderSubmenuItemProps } from '../../../../types/props';

// @ts-expect-error
import { ReactComponent as ArrowIcon } from '../../../../assets/svg/arrow-down.svg';

export default function HeaderSubmenu({
  title,
  children,
}: THeaderSubmenuItemProps) {
  return (
    <div className="menu-header__item menu-header__submenu" tabIndex={0}>
      <span className="menu-header__submenu-name">
        {title}
        <ArrowIcon
          width="10px"
          height="10px"
          className="menu-header__submenu-icon"
        />
      </span>
      <div className="menu-header__submenu-holder">
        <ul className="menu-header__submenu-list">
          {children?.map((child, index) => {
            return (
              <li key={index} className="menu-header__submenu-item">
                {child}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
