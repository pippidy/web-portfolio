import { type TCharacterCardProps } from '../../../types/cards';
import { Link } from 'react-router-dom';
import ImageDummyAvatar from '../ImageDummies/ImageDummyAvatar';
import AnimateImage from '../AnimateImage/AnimateImage';

export default function CharacterCard({
  id,
  name,
  mug_shot,
  linkPrefix,
}: TCharacterCardProps) {
  return (
    <div className="card card-flying animate-image-hover-trigger" title={name}>
      <Link className="card__link" to={`${linkPrefix}character/${id}`}>
        {mug_shot ? (
          <AnimateImage>
            <img src={mug_shot.url} alt={`Mugshot of ${name}`} />
          </AnimateImage>
        ) : (
          <ImageDummyAvatar />
        )}

        <p className="card__name">{name}</p>
      </Link>
    </div>
  );
}
