import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getData } from '../Api/Api';
import { TData, TImageGallery } from '../../types/types';
import SectionLoading from '../SectionLoading/SectionLoading';
import ImageSlider from '../ImageSlider/ImageSlider';

export default function ImageGallery({
  endpoint,
  imageSize,
  fields = '*',
  filter,
  text = 'Image',
}: TImageGallery) {
  const [data, setData] = useState<TData[]>();
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getData({ endpoint: endpoint, fields: fields, filter: filter })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoading(false));
  }, [endpoint, fields, filter]);

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

      <div className="modal">
        <div className="modal__overlay"></div>
        <div className="modal__container">
          <button className="icon-cross modal__button-close"></button>
          <ImageSlider
            data={data}
            imageSize={imageSize}
            text={text}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
        </div>
      </div>
    </>
  );
}
