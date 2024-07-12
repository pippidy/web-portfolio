import React, { Dispatch, SetStateAction } from 'react';
import { TDataFull } from './data';

export type TApiOptions = {
  endpoint: TEndpoint;
  fields: string;
  search?: string;
  limit?: number;
  sort?: string; // example "sort aggregated_rating desc"
  filter?: string; // example "genre = 2" or "id = (2254,5534,2523)"
  offset?: number;
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
  apiOptions: TApiOptions;
  imageSize: string;
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

export type THeaderSubmenuProps = {
  title: string;
  children: TComponentChildren[];
};
