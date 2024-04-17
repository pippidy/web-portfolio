import { TTabs } from '../../types/types';

export default function Tabs({ children, tabs, title = '' }: TTabs) {
  return (
    <div className="tabs">
      <header>
        <h2 className="info-page__title">{title}</h2>
        <ul className="tabs__menu">
          {tabs.map((name) => {
            return (
              <li className="tabs__menu-item">
                <button className="tabs__menu-button">{name}</button>
              </li>
            );
          })}
        </ul>
      </header>

      <div className="tabs__holder">{children}</div>
    </div>
  );
}
