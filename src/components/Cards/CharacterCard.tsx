import { Link } from 'react-router-dom';
import { TCharacter } from '../../types/types';
import ImageDummy from '../ImageDummy/ImageDummy';

export default function CharacterCard({ name, mug_shot }: TCharacter) {
  return (
    <div className="card card_character">
      <Link className="card__link" to="/">
        {mug_shot ? (
          <img
            className="card__image"
            src={mug_shot.url}
            alt={`Cover for ${name}`}
          />
        ) : (
          <ImageDummy />
        )}
      </Link>

      <p className="card__name">{name}</p>
    </div>
  );
}
