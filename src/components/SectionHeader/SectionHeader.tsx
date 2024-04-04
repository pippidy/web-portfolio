import { TSectionHeaderProps } from '../../types/types';

export default function SectionHeader({
  title,
  active,
  setActive,
}: TSectionHeaderProps) {
  function handleClick() {
    setActive(!active);
  }

  return (
    <header onClick={handleClick} className={'section-header'}>
      <h1 className="title-main">
        {title}
        <div className="icon-cross"></div>
      </h1>
    </header>
  );
}
