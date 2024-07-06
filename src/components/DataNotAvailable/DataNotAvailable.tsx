import { type TDataNotAvailableProps } from '../../types/main';

export default function DataNotAvailable({
  text = 'No data available',
}: TDataNotAvailableProps) {
  return (
    <div className="data-not-available">
      <span>{text}</span>
    </div>
  );
}
