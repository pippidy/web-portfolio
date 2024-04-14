import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TGame } from '../../types/types';
import ImageDummyGames from '../ImageDummies/ImageDummyDefault';
// @ts-expect-error
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg';
// @ts-expect-error
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';

export default function GameCard(props: TGame) {
  const { id, name, cover, coverSize, aggregated_rating, release_dates } =
    props;
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked((prevState) => (prevState = !prevState));
  }

  return (
    <div className="card card-flying">
      <header className="card__header">
        <div className="card__rating">
          R:{' '}
          {aggregated_rating ? aggregated_rating.toFixed(1) : <span>n/a</span>}
        </div>

        <div className="card__like">
          <button onClick={handleLikeClick} className="card__like-button">
            <HeartIcon
              className={`heart-icon ${isLiked ? 'liked' : ''}`}
              width="2.1em"
              height="2.1em"
            />{' '}
            0
          </button>
        </div>

        <div className="card__date">
          <CalendarIcon className="calendar-icon" width="20px" height="20px" />
          {release_dates ? release_dates[0].y : ''}
        </div>
      </header>

      <Link className="card__link" to={`game/${id}`}>
        {cover ? (
          <img
            className="card__image"
            src={`//images.igdb.com/igdb/image/upload/t_${coverSize}/${cover?.image_id}.jpg`}
            alt={`Cover for ${name}`}
          />
        ) : (
          <ImageDummyGames />
        )}
      </Link>

      <p className="card__name">{name}</p>
    </div>
  );
}
