import { TSectionHeader } from '../../types/main';

export default function SectionHeader({
  title,
  collapsed,
  setCollapsed,
}: TSectionHeader) {
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
