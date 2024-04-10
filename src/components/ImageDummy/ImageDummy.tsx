// @ts-expect-error
import { ReactComponent as IconExclamation } from '../../assets/svg/exclamation.svg';

export default function ImageDummy() {
  return (
    <div className="image-dummy">
      <IconExclamation className="icon-exclamation" />
      <span>Image Not Found</span>
    </div>
  );
}
