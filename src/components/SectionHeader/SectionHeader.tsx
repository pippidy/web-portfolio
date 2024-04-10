import { TSectionHeaderProps } from '../../types/types';

export default function SectionHeader({
  title,
  collapsed,
  setCollapsed,
}: TSectionHeaderProps) {
  function handleClick() {
    setCollapsed(!collapsed);
  }

  return (
    <header onClick={handleClick} className={'section-header'}>
      <h2 className="title-secondary">
        {title}
        <div className="icon-cross"></div>
      </h2>
    </header>
  );
}
