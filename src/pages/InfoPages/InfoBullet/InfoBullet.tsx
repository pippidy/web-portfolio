import { type TComponentChildren } from '../../../types/main';

export default function InfoBullet({
  name,
  children,
}: {
  name: string;
  children: TComponentChildren;
}) {
  // TODO: Remake it with grid for adaptivity and probably move it to the UI folder
  return (
    <div className="info-bullet">
      <div className="info-bullet__name">{name}:</div>
      <div className="info-bullet__text">{children}</div>
    </div>
  );
}
