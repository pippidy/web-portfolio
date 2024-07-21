import { type TSliderCardProps } from '../../types/main';

// @ts-expect-error
import { ReactComponent as ZoomIcon } from '../../assets/svg/zoom.svg';

export default function SliderCard({
  index,
  className,
  imageSize,
  text,
  imageID,
}: TSliderCardProps) {
  return (
    <div key={`slider-card_${index}`} className={className}>
      <a
        className="image-slider__link"
        href={`//images.igdb.com/igdb/image/upload/t_1080p/${imageID}.jpg`}
        target="_blank"
        rel="noreferrer"
        title="Open full size image"
      >
        <ZoomIcon />
        <img
          className="image-slider__image"
          src={`//images.igdb.com/igdb/image/upload/t_${imageSize}/${imageID}.jpg`}
          alt=""
          loading="lazy"
        />
      </a>

      <span className="image-slider__text">{`${text} №${index + 1}`}</span>
    </div>
  );
}
