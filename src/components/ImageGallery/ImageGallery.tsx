import { type TImageGalleryProps } from '../../types/main';
import { useState } from 'react';
import SectionLoading from '../Section/SectionLoading/SectionLoading';
import ImageSlider from '../ImageSlider/ImageSlider';
import Modal from '../UI/Modal/Modal';
import useGetData from '../../hooks/useGetData';
import DataNotAvailable from '../DataNotAvailable/DataNotAvailable';
import GalleryCard from './GalleryCard';

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
              <GalleryCard
                index={index}
                onClick={() => openImage(index)}
                imageID={item.image_id}
                imageSize={imageSize}
                text={text}
              />
            );
          })}
        </ul>
      ) : (
        <DataNotAvailable />
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
