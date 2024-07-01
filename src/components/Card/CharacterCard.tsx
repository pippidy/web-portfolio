import { Link } from 'react-router-dom';
import { TCharacterCardProps } from '../../types/cards';
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
          <img
            className="card__image"
            src={mug_shot.url}
            alt={`Mugshot of ${name}`}
          />
        ) : (
          <ImageDummyAvatar />
        )}

        <p className="card__name">{name}</p>
      </Link>
    </div>
  );
}
