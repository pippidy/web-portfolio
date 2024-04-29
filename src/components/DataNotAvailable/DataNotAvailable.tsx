import { TDataNotAvailable } from '../../types/types';

export default function DataNotAvailable({
  text = 'No data available',
}: TDataNotAvailable) {
  return (
    <div className="data-not-available">
      <h3>{text}</h3>
    </div>
  );
}
