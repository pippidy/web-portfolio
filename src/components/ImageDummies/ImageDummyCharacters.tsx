// @ts-expect-error
import { ReactComponent as IconAvatar } from '../../assets/svg/avatar.svg';

export default function ImageDummyCharacters() {
  return (
    <div className="image-dummy image-dummy_character">
      <IconAvatar className="icon-dummy" />
      <span className="image-dummy__text">Mugshot not found</span>
    </div>
  );
}
