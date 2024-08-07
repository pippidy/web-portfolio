import React, { type Dispatch, type SetStateAction } from 'react';
import { type TDataImage } from './data';

export type TApiOptions = {
  endpoint: TEndpoint;
  fields: string;
  search?: string;
  sort?: TSort;
  filter?: string; // example "genre = 2" or "id = (2254,5534,2523)"
  limit?: number;
  offset?: number;
};

export type TSort = {
  property: string;
  order?: 'desc' | 'asc';
};

export type TComponentChildren = React.ReactNode;

export type TEndpoint =
  | 'games'
  | 'characters'
  | 'companies'
  | 'screenshots'
  | 'artworks';

export type TError = {
  status?: boolean;
  code?: number;
  message?: string;
};

export type TNameAndID = {
  id?: number;
  name?: string;
};

export type TConfigAPI = {
  baseURL: string;
  headers: Record<string, string>;
};

export type TFormatDate = {
  timestamp: number | undefined;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
};

export type TGetCountryFromISO = {
  isoCode: number;
  length?: 'short' | 'medium' | 'full';
};

export type TCutLongString = {
  string: string;
  length: number;
  end?: string; // three dots at the end of the title for example
};

export type TTabsProps = {
  tabs: string[];
  title?: string | null | undefined;
  children?: TComponentChildren[];
};

export type TDataNotAvailableProps = {
  text?: string;
};

export type TCategory = TNameAndID;

export type TSectionProps = {
  title: string;
  children?: TComponentChildren;
  className?: string;
};

export type TSectionHeaderProps = {
  title: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TImageGalleryProps = {
  apiOptions: TApiOptions;
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
};

export type TCatalogueMenuProps = {
  endpoint: TEndpoint;
  category: string;
};

export type THeaderSubmenuProps = {
  title: string;
  children: TComponentChildren[];
};

export type TInfoItemProps = { name: string; children: TComponentChildren };

export type TContactsItem = {
  title: string;
  children: TComponentChildren;
};

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
