import { useState } from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import { TSection } from '../../types/types';

export default function Section(props: TSection) {
  const { title, children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const activeClass = collapsed ? 'section_collapsed' : '';

  return (
    <>
      <section
        className={`section ${activeClass} block-default block-default_shadowDown`}
      >
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
