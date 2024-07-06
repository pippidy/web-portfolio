import { type TSectionProps } from '../../types/main';
import { useState } from 'react';
import SectionHeader from './SectionHeader';
import cn from 'classnames';

export default function Section({
  title,
  children,
  className = '',
}: TSectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Classnames
  const classSection = cn(
    `section block-default block-default_shadowDown ${className}`,
    {
      collapsed: collapsed,
    }
  );

  // TODO: Remake it with grid for height animation
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
