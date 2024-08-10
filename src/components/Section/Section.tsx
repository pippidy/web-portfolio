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

  const mainClass = cn(
    `section block-default block-default_shadowDown ${className}`,
    {
      collapsed: collapsed,
    }
  );

  return (
    <>
      <section className={mainClass}>
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
