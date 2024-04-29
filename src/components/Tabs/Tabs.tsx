import { useEffect, useState } from 'react';
import { TTabs } from '../../types/types';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

export default function Tabs({ children, tabs, title = '' }: TTabs) {
  const [toggle, setToggle] = useState<number>(0);
  const [startingPosition, setStartingPosition] = useState('right');
  const location = useLocation();

  // Switch to the first tab on page change
  useEffect(() => {
    setToggle(0);
    setStartingPosition('right');
  }, [location]);

  function toggleTab(id: number) {
    const activeTab = document.querySelector('.displayed');
    let tabsPos: string; // starting position of hidden tabs

    // Animation changes sides depending on tab position
    if (id < toggle) {
      activeTab?.classList.add('move-out_right');
      tabsPos = 'right';
    } else {
      activeTab?.classList.add('move-out_left');
      tabsPos = 'left';
    }

    document.querySelector(`#tab_${id}`)?.classList.add('displayed');

    setTimeout(() => {
      setToggle(id);
      setStartingPosition(tabsPos);
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
              'pos-left': startingPosition === 'left',
              'pos-right': startingPosition === 'right',
              displayed: toggle === index,
            });

            return (
              <div
                id={`tab_${index}`}
                className={className}
                key={`tabContent_${index}`}
              >
                {child}
              </div>
            );
          })}
      </div>
    </div>
  );
}
