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

export type TTabs = {
  tabs: string[];
  children?: TComponentChildren[];
  title?: string | null | undefined;
};

export type TDataNotAvailable = {
  text?: string;
};

export type TCategory = TNameAndID;

export type TSection = {
  title: string;
  children?: TComponentChildren;
  className?: string;
};

export type TSectionHeader = {
  title: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TImageGallery = {
  endpoint: 'screenshots' | 'artworks';
  imageSize: string;
  fields?: string;
  limit?: number;
  filter?: string;
  text?: 'Image' | 'Screenshot' | 'Artwork';
};

export type TImageSlider = {
  data: TDataFull[] | undefined;
  imageSize: string;
  text: string;
  currentImage: number;
  setCurrentImage: Dispatch<SetStateAction<number>>;
};

export type TCatalogue = {
  endpoint: TEndpoint;
  category: string;
  title: string;
};

export type TCatalogueMenu = {
  endpoint: TEndpoint;
  category: string;
};
