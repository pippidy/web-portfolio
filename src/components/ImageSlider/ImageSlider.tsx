import { TImageSlider } from '../../types/types';
import cn from 'classnames';

// @ts-expect-error
import { ReactComponent as ArrowIcon } from '../../assets/svg/arrow-circle.svg';

export default function ImageSlider({
  data,
  imageSize,
  text,
  currentImage,
  setCurrentImage,
}: TImageSlider) {
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
    <div className="image-slider">
      {/* Button PREV */}
      <button
        onClick={prevImage}
        className="image-slider__button image-slider__button_prev"
      >
        <ArrowIcon />
      </button>

      {/* Button NEXT */}
      <button
        onClick={nextImage}
        className="image-slider__button image-slider__button_next"
      >
        <ArrowIcon />
      </button>

      {data?.map((item, index) => {
        const cardClass = cn('image-slider__card', {
          current: index === currentImage,
          prev: index < currentImage,
          next: index > currentImage,
        });

        return (
          <div key={`slider-card_${index}`} className={cardClass}>
            <img
              className="image-slider__image"
              src={`//images.igdb.com/igdb/image/upload/t_${imageSize}/${item.image_id}.jpg`}
              alt=""
            />
            <span className="image-slider__text">{`${text} №${
              index + 1
            }`}</span>
          </div>
        );
      })}
    </div>
  );
}
