import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getData } from '../../api/api';
import { TData, TImageGallery } from '../../types/types';
import SectionLoading from '../Section/SectionLoading/SectionLoading';
import ImageSlider from '../ImageSlider/ImageSlider';
import Modal from '../Modal/Modal';
import { catchFetchError } from '../../utils/utils';

export default function ImageGallery({
  endpoint,
  imageSize = 't_thumb',
  fields = '*',
  limit,
  filter,
  text = 'Image',
}: TImageGallery) {
  const [data, setData] = useState<TData[]>();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  function openImage(index: number) {
    setCurrentImage(index);
    setIsModalOpened(true);
  }

  useEffect(() => {
    getData({
      endpoint: endpoint,
      fields: fields,
      limit: limit,
      filter: filter,
    })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        catchFetchError(error);
      })
      .finally(() => setLoading(false));
  }, [endpoint, fields, limit, filter]);

  useEffect(() => {
    setLoading(true);
  }, [location]);

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
                title={`Open image №${index + 1}`}
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
