import { TSectionHeader } from '../../../types/types';

export default function SectionHeader({
  title,
  collapsed,
  setCollapsed,
}: TSectionHeader) {
  function handleClick() {
    setCollapsed(!collapsed);
  }

  return (
    <header
      onClick={handleClick}
      className={'section-header'}
      title={`Collapse section ${title}`}
    >
      <h2 className="title-secondary">
        {title}
        <div className="icon-cross"></div>
      </h2>
    </header>
  );
}
