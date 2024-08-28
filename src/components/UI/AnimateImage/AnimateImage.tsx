import { type TComponentChildren } from '../../../types/main';
import React, { ReactElement } from 'react';

type TAnimateImage = {
  children: TComponentChildren<ReactElement>;
  grayscaleAmount?: string;
};

export default function AnimateImage({
  children: image,
  grayscaleAmount = '90%',
}: TAnimateImage) {
  // Extracting class that was passed with the image
  const initialClass = image.props.className;

  // Creating clone image that will be animated
  const imageAnimatable = React.cloneElement(image, {
    className: `${initialClass} animate-image__image animatable`,
    alt: '',
  });

  const imageInitial = React.cloneElement(image, {
    style: { filter: `grayscale(${grayscaleAmount})` },
    className: `${initialClass} animate-image__image`,
  });

  return (
    <div className="animate-image">
      {imageAnimatable}
      {imageInitial}
    </div>
  );
}
