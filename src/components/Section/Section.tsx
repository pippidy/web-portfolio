import { useState } from 'react';
import SectionHeader from './SectionHeader';
import { TSection } from '../../types/main';
import cn from 'classnames';

export default function Section({ title, children, className = '' }: TSection) {
  const [collapsed, setCollapsed] = useState(false);

  // Classnames
  const classSection = cn(
    `section block-default block-default_shadowDown ${className}`,
    {
      collapsed: collapsed,
    }
  );

  return (
    <>
      <section className={classSection}>
        <SectionHeader
          title={title}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="section__content">{children}</div>
      </section>

      <div className="section-separator"></div>
    </>
  );
}
