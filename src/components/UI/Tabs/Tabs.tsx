import { useEffect, useState } from 'react';
import { TTabs } from '../../../types/main';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import Button from '../Buttons/Button/Button';

export default function Tabs({ tabs, children, title = '' }: TTabs) {
  const [toggle, setToggle] = useState<number>(0);
  const location = useLocation();

  // Switch to the first tab on page change
  useEffect(() => {
    setToggle(0);
  }, [location]);

  function toggleTab(id: number) {
    const activeTabElement = document.querySelector('.displayed');
    document.body.classList.add('overflow-hidden'); // To fix bug with scroll jumping

    // Animation changes sides depending on tab index
    if (id < toggle || id === 0) {
      activeTabElement?.classList.add('move-out_right');
    } else {
      activeTabElement?.classList.add('move-out_left');
    }

    document.querySelector(`#tab_${id}`)?.classList.add('displayed');

    setTimeout(() => {
      setToggle(id);
      document.body.classList.remove('overflow-hidden');
    }, 200);
  }

  return (
    <div className="tabs">
      <header>
        <h3 className="section__title-accent">{title}</h3>
        <ul className="tabs__menu" role="tablist">
          {tabs.map((tabName, index) => {
            const className = cn('tabs__menu-button', {
              current: toggle === index,
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
        {children &&
          children.map((child, index) => {
            const className = cn('tabs__content', {
              'pos-left': index < toggle,
              'pos-right': index > toggle,
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
