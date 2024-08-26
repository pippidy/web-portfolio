import { type TSectionHeaderProps } from '../../../types/props';

export default function SectionHeader({
  title,
  collapsed,
  setCollapsed,
}: TSectionHeaderProps) {
  function onClick() {
    setCollapsed(!collapsed);
  }

  return (
    <header
      onClick={onClick}
      className="section__header"
      title={`Collapse section ${title}`}
    >
      <h2 className="title-secondary">
        {title}
        <div className="icon-cross"></div>
      </h2>
    </header>
  );
}
