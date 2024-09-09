import { type TImageSliderProps } from '../../../types/props';
import SliderCard from './SliderCard';
import cn from 'classnames';
import useKey from '../../hooks/useKey';

// @ts-expect-error
import { ReactComponent as ArrowIcon } from '../../../assets/svg/arrow-circle.svg';

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

  useKey({
    key: 'ArrowRight',
    event: 'keyup',
    callback: nextImage,
  });

  useKey({
    key: 'ArrowLeft',
    event: 'keyup',
    callback: prevImage,
  });

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

          {data.map((item, index) => {
            const cardClass = cn('image-slider__card', {
              current: index === currentImage,
              prev: index < currentImage,
              next: index > currentImage,
            });

            return (
              <SliderCard
                index={index}
                key={`slider-card_${index}`}
                className={cardClass}
                imageSize={imageSize}
                text={text}
                imageID={item.image_id}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
