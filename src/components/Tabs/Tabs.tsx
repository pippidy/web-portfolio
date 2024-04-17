import { useEffect, useState } from 'react';
import { TTabs } from '../../types/types';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

export default function Tabs({ children, tabs, title = '' }: TTabs) {
  const [toggle, setToggle] = useState<string | number>(0);
  const location = useLocation();

  // Fixing bug with loading indicator when you choose another game
  useEffect(() => {
    const activeTab = document.querySelector('.displayed');

    activeTab?.classList.add('hidden');
    setTimeout(() => {
      activeTab?.classList.remove('hidden');
    }, 100);

    setToggle(0);
  }, [location]);

  function toggleTab(id: number) {
    const activeTab = document.querySelector('.displayed');

    if (id < Math.floor(tabs.length / 2)) {
      activeTab?.classList.add('move-out_left');
    } else {
      activeTab?.classList.add('move-out_right');
    }

    setTimeout(() => {
      setToggle(id);
    }, 200);
  }

  return (
    <div className="tabs">
      <header>
        <h2 className="info-page__title">{title}</h2>
        <ul className="tabs__menu">
          {tabs.map((name, index) => {
            const className = cn('tabs__menu-button', {
              current: toggle === index,
            });

            return (
              <li className="tabs__menu-item" key={`tabLink_${index}`}>
                <button className={className} onClick={() => toggleTab(index)}>
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </header>

      <div className="tabs__holder">
        {children &&
          children.map((child, index) => {
            const className = cn('tabs__content', {
              displayed: toggle === index,
            });

            return (
              <div className={className} key={`tabContent_${index}`}>
                {child}
              </div>
            );
          })}
      </div>
    </div>
  );
}
