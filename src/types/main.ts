import React, { Dispatch, SetStateAction } from 'react';
import { TDataFull } from './data';

export type TComponentChildren = React.ReactNode;

export type TEndpoint = 'games' | 'characters' | 'companies';

export type TError = {
  status?: boolean;
  code?: number;
  message?: string;
};

export type TExtractEnumData = {
  id: number | undefined;
  enumObject: any;
};

export type TNameAndID = {
  id?: number;
  name?: string;
};

export type TConfigAPI = {
  baseURL: string;
  headers: {};
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
  children?: TComponentChildren[];
  title?: string | null | undefined;
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
  endpoint: 'screenshots' | 'artworks';
  imageSize: string;
  fields?: string;
  limit?: number;
  filter?: string;
  text?: 'Image' | 'Screenshot' | 'Artwork';
};

export type TImageSliderProps = {
  data: TDataFull[] | undefined;
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
