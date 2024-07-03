import { useState } from 'react';
import { TImageGalleryProps } from '../../types/main';
import SectionLoading from '../Section/SectionLoading/SectionLoading';
import ImageSlider from '../ImageSlider/ImageSlider';
import Modal from '../UI/Modal/Modal';
import useGetData from '../../hooks/useGetData';

export default function ImageGallery({
  apiOptions,
  imageSize = 't_thumb',
  text = 'Image',
}: TImageGalleryProps) {
  const { data, loading } = useGetData({
    ...apiOptions,
  });
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  function openImage(index: number) {
    setCurrentImage(index);
    setIsModalOpened(true);
  }

  return (
    <>
      {loading ? (
        <SectionLoading />
      ) : data ? (
        <ul className="image-gallery">
          {data.map((item, index) => {
            return (
              <li
                onClick={() => openImage(index)}
                key={`image-gallery-card_${index}`}
                className="image-gallery__card card-flying cursor-pointer"
              >
                <img
                  className="image-gallery__image"
                  src={`//images.igdb.com/igdb/image/upload/t_${imageSize}/${item.image_id}.jpg`}
                  alt=""
                  loading="lazy"
                />
                <span className="image-gallery__text">{`${text} №${
                  index + 1
                }`}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="data-not-available">
          <h3>No data available</h3>
        </div>
      )}

      <Modal
        isOpened={isModalOpened}
        setIsOpened={setIsModalOpened}
        classList="modal-image-slider"
      >
        <ImageSlider
          data={data}
          imageSize={imageSize}
          text={text}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
      </Modal>
    </>
  );
}
