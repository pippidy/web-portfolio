import { TComponentChildren } from '../../../types/main';

export default function InfoBullet({
  name,
  children,
}: {
  name: string;
  children: TComponentChildren;
}) {
  return (
    <div className="info-bullet">
      <div className="info-bullet__name">{name}:</div>
      <div className="info-bullet__text">{children}</div>
    </div>
  );
}
