import { type TInfoItemProps } from '../../../../../types/main';

export default function InfoItem({ name, children }: TInfoItemProps) {
  // TODO: Remake it with grid for adaptivity and probably move it to the UI folder
  return (
    <div className="info-bullet">
      <div className="info-bullet__name">{name}:</div>
      <div className="info-bullet__text">{children}</div>
    </div>
  );
}
