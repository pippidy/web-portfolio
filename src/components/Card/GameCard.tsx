import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TGameCard } from '../../types/types';
import cn from 'classnames';
import ImageDummyGames from '../ImageDummies/ImageDummyDefault';

// @ts-expect-error
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg';
// @ts-expect-error
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';

export default function GameCard({
  id,
  name,
  cover,
  coverSize,
  aggregated_rating,
  first_release_date,
  linkPrefix = '',
  cardSize = 'default',
}: TGameCard) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Classnames
  const classHeart = cn('heart-icon', { liked: isLiked });

  function onLikeClick() {
    setIsLiked((prevState) => (prevState = !prevState));
    setLikeCount((prevState) => {
      if (!isLiked) {
        return (prevState += 1);
      } else {
        return (prevState -= 1);
      }
    });
  }

  return (
    <div className="card card-flying">
      {cardSize !== 'mini' && (
        <header className="card__header" aria-hidden="true">
          <div className="card__rating" title="Aggregated rating">
            R:{' '}
            {aggregated_rating ? (
              aggregated_rating.toFixed(0)
            ) : (
              <span>n/a</span>
            )}
          </div>

          <div className="card__like">
            <button
              onClick={onLikeClick}
              className="card__like-button"
              title="Like game"
            >
              <HeartIcon className={classHeart} width="2.1em" height="2.1em" />{' '}
              {likeCount}
            </button>
          </div>

          {cardSize !== 'compact' && (
            <div className="card__date" title="Release date">
              <CalendarIcon
                className="calendar-icon"
                width="20px"
                height="20px"
              />
              {first_release_date
                ? new Date(first_release_date * 1000).getFullYear()
                : 'n/a'}
            </div>
          )}
        </header>
      )}

      <Link
        onClick={() => window.scrollTo(0, 0)}
        className="card__link"
        to={`${linkPrefix}game/${id ? id : ''}`}
        title={name}
      >
        {cover ? (
          <img
            className="card__image"
            src={`//images.igdb.com/igdb/image/upload/t_${coverSize}/${cover?.image_id}.jpg`}
            alt={`Cover for ${name}`}
            loading="lazy"
          />
        ) : (
          <ImageDummyGames />
        )}

        <p className="card__name">{name}</p>
      </Link>
    </div>
  );
}
