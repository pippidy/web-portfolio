import { type TTabsProps } from '../../types/props';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../UI/Buttons/ButtonDefault/ButtonDefault';
import cn from 'classnames';

export default function Tabs({ tabs, title = '', children }: TTabsProps) {
  const [active, setActive] = useState<number>(0);
  const location = useLocation();

  // Switch to the first tab on page change
  useEffect(() => {
    setActive(0);
  }, [location]);

  function toggleTab(id: number) {
    const activeTabElement = document.querySelector('.active');

    // Animation changes sides depending on tab index
    if (id < active || id === 0) {
      activeTabElement?.classList.add('move-out_right');
    } else {
      activeTabElement?.classList.add('move-out_left');
    }

    document.querySelector(`#tab_${id}`)?.classList.add('active');

    setTimeout(() => {
      setActive(id);
    }, 200);
  }

  return (
    <div className="tabs">
      <header>
        <h3 className="section__title-accent">{title}</h3>
        <ul className="tabs__menu" role="tablist">
          {tabs.map((tabName, index) => {
            const className = cn('tabs__menu-button', {
              current: active === index,
            });

            return (
              <li className="tabs__menu-item" key={`tabLink_${index}`}>
                <Button
                  className={className}
                  onClick={() => toggleTab(index)}
                  title={`Switch to ${tabName} tab`}
                  role="tab"
                >
                  {tabName}
                </Button>
              </li>
            );
          })}
        </ul>
      </header>

      <div className="tabs__holder">
        {children?.map((child, index) => {
          const className = cn('tabs__content', {
            'pos-left': index < active,
            'pos-right': index > active,
            active: active === index,
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
