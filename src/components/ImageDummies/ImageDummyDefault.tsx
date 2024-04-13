// @ts-expect-error
import { ReactComponent as IconExclamation } from '../../assets/svg/exclamation.svg';

export default function ImageDummyDefault() {
  return (
    <div className="image-dummy">
      <IconExclamation className="icon-dummy" />
      <span className="image-dummy__text">Image Not Found</span>
    </div>
  );
}
