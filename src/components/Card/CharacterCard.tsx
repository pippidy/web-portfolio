import { Link } from 'react-router-dom';
import { TCharacterCard } from '../../types/types';
import ImageDummyCharacters from '../ImageDummies/ImageDummyCharacters';
import { cutLongString } from '../Utils/Utils';

export default function CharacterCard({
  id,
  name,
  mug_shot,
  linkPrefix,
}: TCharacterCard) {

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
          <ImageDummyCharacters />
        )}

        <p className="card__name">
          {name}
        </p>
      </Link>
    </div>
  );
}
