import { Link } from 'react-router-dom';
import { TCharacter } from '../../types/types';
import ImageDummyCharacters from '../ImageDummies/ImageDummyCharacters';

export default function CharacterCard({ name, mug_shot }: TCharacter) {
  return (
    <div className="card">
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
      </Link>

      <p className="card__name">{name}</p>
    </div>
  );
}
