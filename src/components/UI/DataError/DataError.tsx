import { type TError } from '../../../types/main';
import ErrorBlock from '../ErrorBlock/ErrorBlock';

export default function DataError({ error }: { error: TError }) {
  return (
    <ErrorBlock title="Error">
      <p className="error-block__text">
        <span>{error.message}</span>
      </p>

      <p className="error-block__text">
        Please, try <span>reloading</span> the page!
      </p>
    </ErrorBlock>
  );
}
