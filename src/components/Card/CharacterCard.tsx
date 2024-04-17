import { Link } from 'react-router-dom';
import { TCharacter } from '../../types/types';
import ImageDummyCharacters from '../ImageDummies/ImageDummyCharacters';
import { cutLongString } from '../Utils/Utils';

export default function CharacterCard({ name, mug_shot }: TCharacter) {
  const nameLength = 16;

  return (
    <div className="card card-flying" title={name}>
      <Link className="card__link" to="/">
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
          {name
            ? cutLongString({ string: name, length: nameLength, end: '...' })
            : ''}
        </p>
      </Link>
    </div>
  );
}
