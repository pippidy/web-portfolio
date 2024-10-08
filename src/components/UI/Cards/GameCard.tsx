import { type TGameCardProps } from '../../../types/cards';
import { Link } from 'react-router-dom';
import ImageDummyGames from '../ImageDummies/ImageDummyDefault';
import ButtonLike from '../Buttons/ButtonLike/ButtonLike';

// @ts-expect-error
import { ReactComponent as CalendarIcon } from '../../../assets/svg/calendar.svg';
import AnimateImage from '../AnimateImage/AnimateImage';

export default function GameCard({
  id,
  name,
  cover,
  coverSize,
  aggregated_rating,
  first_release_date,
  linkPrefix,
  cardSize = 'default',
}: TGameCardProps) {
  return (
    <div className="card card-flying animate-image-hover-trigger">
      {cardSize !== 'mini' && (
        <header className="card__header" aria-hidden="true">
          {/* RATING */}
          <div className="card__rating" title="Aggregated rating">
            R:{' '}
            {aggregated_rating ? (
              aggregated_rating.toFixed(0)
            ) : (
              <span>n/a</span>
            )}
          </div>

          {/* LIKE BUTTON */}
          <div className="card__like">
            <ButtonLike />
          </div>

          {/* RELEASE DATE */}
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
          <AnimateImage>
            <img
              src={`//images.igdb.com/igdb/image/upload/t_${coverSize}/${cover?.image_id}.jpg`}
              alt={`Cover for ${name}`}
              loading="lazy"
            />
          </AnimateImage>
        ) : (
          <ImageDummyGames />
        )}

        <p className="card__name">{name}</p>
      </Link>
    </div>
  );
}
