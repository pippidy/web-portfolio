import { TImageSliderProps } from '../../types/main';
import cn from 'classnames';
import { Link } from 'react-router-dom';

// @ts-expect-error
import { ReactComponent as ArrowIcon } from '../../assets/svg/arrow-circle.svg';
// @ts-expect-error
import { ReactComponent as ZoomIcon } from '../../assets/svg/zoom.svg';

export default function ImageSlider({
  data,
  imageSize,
  text,
  currentImage,
  setCurrentImage,
}: TImageSliderProps) {
  function nextImage() {
    if (data && currentImage === data.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prevState) => (prevState += 1));
    }
  }

  function prevImage() {
    if (data && currentImage === 0) {
      setCurrentImage(data.length - 1);
    } else {
      setCurrentImage((prevState) => (prevState -= 1));
    }
  }

  return (
    <>
      {data && (
        <div className="image-slider">
          {data.length > 1 && (
            <>
              {/* Button PREV */}
              <button
                onClick={prevImage}
                className="image-slider__button image-slider__button_prev"
                title="Switch to the previous image"
              >
                <ArrowIcon />
              </button>

              {/* Button NEXT */}
              <button
                onClick={nextImage}
                className="image-slider__button image-slider__button_next"
                title="Switch to the next image"
              >
                <ArrowIcon />
              </button>
            </>
          )}

          {data?.map((item, index) => {
            const cardClass = cn('image-slider__card', {
              current: index === currentImage,
              prev: index < currentImage,
              next: index > currentImage,
            });

            return (
              <div key={`slider-card_${index}`} className={cardClass}>
                <Link
                  className="image-slider__link"
                  to={`//images.igdb.com/igdb/image/upload/t_1080p/${item.image_id}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  title="Open full size image"
                >
                  <ZoomIcon />
                  <img
                    className="image-slider__image"
                    src={`//images.igdb.com/igdb/image/upload/t_${imageSize}/${item.image_id}.jpg`}
                    alt=""
                    loading="lazy"
                  />
                </Link>

                <span className="image-slider__text">{`${text} №${
                  index + 1
                }`}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
