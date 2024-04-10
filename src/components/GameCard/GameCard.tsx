import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TGame } from '../../types/types';
import ImageDummy from '../ImageDummy/ImageDummy';
// @ts-expect-error
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg';
// @ts-expect-error
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';

export default function GameCard(props: TGame) {
  const { name, cover, coverSize, aggregated_rating } = props;
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked((prevState) => (prevState = !prevState));
  }

  return (
    <div className="game-card">
      <header className="game-card__header">
        <div className="game-card__rating">
          R:{' '}
          {aggregated_rating ? aggregated_rating.toFixed(1) : <span>n/a</span>}
        </div>

        <div className="game-card__like">
          <button onClick={handleLikeClick} className="game-card__like-button">
            <HeartIcon
              className={`heart-icon ${isLiked ? 'liked' : ''}`}
              width="2.1em"
              height="2.1em"
            />{' '}
            0
          </button>
        </div>

        <div className="game-card__date">
          <CalendarIcon className="calendar-icon" width="20px" height="20px" />
          1995
        </div>
      </header>

      <Link className="game-card__link" to="/">
        {cover ? (
          <img
            className="game-card__image"
            src={`//images.igdb.com/igdb/image/upload/t_${coverSize}/${cover?.image_id}.jpg`}
            alt={`Cover for ${name}`}
          />
        ) : (
          <ImageDummy />
        )}
      </Link>

      <p className="game-card__name">{name}</p>
    </div>
  );
}
