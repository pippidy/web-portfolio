import { TDataNotAvailable } from '../../types/main';

export default function DataNotAvailable({
  text = 'No data available',
}: TDataNotAvailable) {
  return (
    <div className="data-not-available">
      <span>{text}</span>
    </div>
  );
}
