import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getData } from '../Api/Api';
import { TData, TImageGallery } from '../../types/types';
import SectionLoading from '../SectionLoading/SectionLoading';
import ImageSlider from '../ImageSlider/ImageSlider';
import Modal from '../Modal/Modal';

export default function ImageGallery({
  endpoint,
  imageSize,
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
      .catch((err) => console.log(`Error: ${err}`))
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
              >
                <img
                  className="image-gallery__image"
                  src={`//images.igdb.com/igdb/image/upload/t_${imageSize}/${item.image_id}.jpg`}
                  alt=""
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

      <Modal isOpened={isModalOpened} setIsOpened={setIsModalOpened}>
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
