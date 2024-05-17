import { useState } from 'react';
import SectionHeader from './SectionHeader';
import { TSection } from '../../types/types';
import cn from 'classnames';

export default function Section({ title, children, className = '' }: TSection) {
  const [collapsed, setCollapsed] = useState(false);

  // Classnames
  const classSection = cn(
    `section ${className} block-default block-default_shadowDown`,
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
