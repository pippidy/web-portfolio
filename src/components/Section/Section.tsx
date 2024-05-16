import { useState } from 'react';
import SectionHeader from './SectionHeader/SectionHeader';
import { TSection } from '../../types/types';
import cn from 'classnames';

export default function Section(props: TSection) {
  const { title, children } = props;
  const [collapsed, setCollapsed] = useState(false);

  // Classnames
  const classSection = cn('section block-default block-default_shadowDown', {
    collapsed: collapsed,
  });

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
