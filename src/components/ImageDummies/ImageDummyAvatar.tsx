// @ts-expect-error
import { ReactComponent as IconAvatar } from '../../assets/svg/avatar.svg';

export default function ImageDummyAvatar() {
  return (
    <div className="image-dummy image-dummy_avatar">
      <IconAvatar className="icon-dummy" />
      <span className="image-dummy__text">Avatar not found</span>
    </div>
  );
}
