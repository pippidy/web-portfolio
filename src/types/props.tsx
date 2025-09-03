import { ReactElement, type Dispatch, type SetStateAction } from 'react';
import { type TCardSize, type TLinkPrefix } from './cards';
import { type TDataImage, type TDataFull } from './data';
import {
  type TQueryParams,
  type TComponentChildren,
  type TEndpoint,
  type TError,
} from './main';
import { TAuthType } from './auth';

export type TSliderCardProps = {
  index: number;
  className: string;
  imageSize: string;
  text: string;
  imageID: string;
};

export type TGalleryCardProps = Omit<TSliderCardProps, 'className'> & {
  onClick: (index: number) => void;
};

export type TUseSearchProps = {
  query: string;
  limit?: number;
};

export type TCardsRenderProps = {
  data: TDataFull[] | undefined;
  loading: boolean;
  error: TError | undefined;
  cardType: TEndpoint;
  cardSize?: TCardSize;
  linkPrefix?: TLinkPrefix;
};

export type TSectionProps = {
  title: string;
  children?: TComponentChildren<React.ReactNode>;
  className?: string;
};

export type TSectionHeaderProps = {
  title: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TImageGalleryProps = {
  apiOptions: TQueryParams;
  imageSize: string;
  text?: 'Image' | 'Screenshot' | 'Artwork';
};

export type TImageSliderProps = {
  data: TDataImage[] | undefined;
  imageSize: string;
  text: string;
  currentImage: number;
  setCurrentImage: Dispatch<SetStateAction<number>>;
};

export type TCatalogueProps = {
  endpoint: TEndpoint;
  category: string;
  title: string;
  fetchLimit?: number;
};

export type TCatalogueMenuProps = {
  endpoint: TEndpoint;
  category: string;
};

export type THeaderSubmenuProps = {
  title: string;
  children: TComponentChildren<ReactElement>[];
};

export type TTabsProps = {
  tabs: string[];
  title?: string | null | undefined;
  children?: TComponentChildren<React.ReactNode>[];
};

export type TDataNotAvailableProps = {
  text?: string;
};

export type TAuthFormProps = {
  authType: TAuthType;
  setAuthType: Dispatch<SetStateAction<TAuthType>>;
};

export type TButtonSignOutProps = {
  children: TComponentChildren<React.ReactNode>;
  className?: string;
};
