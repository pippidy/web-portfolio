import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TGameCard } from '../../types/types';
import { cutLongString } from '../Utils/Utils';
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
  const nameLength = 20;

  // Classnames
  const classHeart = cn('heart-icon', { liked: isLiked });

  function handleLikeClick() {
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
    <div className="card card-flying" title={name}>
      {cardSize !== 'mini' ? (
        <header className="card__header">
          <div className="card__rating" title="Aggregated rating">
            R:{' '}
            {aggregated_rating ? (
              aggregated_rating.toFixed(0)
            ) : (
              <span>n/a</span>
            )}
          </div>

          <div className="card__like">
            <button onClick={handleLikeClick} className="card__like-button">
              <HeartIcon className={classHeart} width="2.1em" height="2.1em" />{' '}
              {likeCount}
            </button>
          </div>

          {cardSize !== 'compact' ? (
            <div className="card__date">
              <CalendarIcon
                className="calendar-icon"
                width="20px"
                height="20px"
              />
              {first_release_date
                ? new Date(first_release_date * 1000).getFullYear()
                : 'n/a'}
            </div>
          ) : (
            ''
          )}
        </header>
      ) : (
        ''
      )}

      <Link
        onClick={() => window.scrollTo(0, 0)}
        className="card__link"
        to={`${linkPrefix}game/${id ? id : ''}`}
      >
        {cover ? (
          <img
            className="card__image"
            src={`//images.igdb.com/igdb/image/upload/t_${coverSize}/${cover?.image_id}.jpg`}
            alt={`Cover for ${name}`}
          />
        ) : (
          <ImageDummyGames />
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
