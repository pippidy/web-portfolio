import { type TGalleryCardProps } from '../../../types/props';

export default function GalleryCard({
  index,
  onClick,
  imageSize,
  text,
  imageID,
}: TGalleryCardProps) {
  return (
    <li
      onClick={() => onClick(index)}
      className="image-gallery__card card-flying animate-image-hover-trigger cursor-pointer"
    >
      <img
        className="image-gallery__image"
        src={`//images.igdb.com/igdb/image/upload/t_${imageSize}/${imageID}.jpg`}
        alt=""
        loading="lazy"
      />

      <span className="image-gallery__text">{`${text} №${index + 1}`}</span>
    </li>
  );
}
