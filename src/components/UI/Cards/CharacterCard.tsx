import { type TCharacterCardProps } from '../../../types/cards';
import { Link } from 'react-router-dom';
import ImageDummyAvatar from '../ImageDummies/ImageDummyAvatar';

export default function CharacterCard({
  id,
  name,
  mug_shot,
  linkPrefix,
}: TCharacterCardProps) {
  return (
    <div className="card card-flying" title={name}>
      <Link className="card__link" to={`${linkPrefix}character/${id}`}>
        {mug_shot ? (
          <div className="card__image-holder">
            <img
              className="card__image card__image_animate"
              src={mug_shot.url}
              alt={`Mugshot of ${name}`}
            />
            <img
              className="card__image card__image_grayscale"
              src={mug_shot.url}
              alt={`Mugshot of ${name}`}
            />
          </div>
        ) : (
          <ImageDummyAvatar />
        )}

        <p className="card__name">{name}</p>
      </Link>
    </div>
  );
}
