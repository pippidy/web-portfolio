import React, { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type TComponentChildren = React.ReactNode;

export type TNameAndID = {
  id?: number;
  name?: string;
};

export type TSectionHeader = {
  title: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TConfigAPI = {
  baseURL: string;
  headers: {};
};

export type TSection = {
  title: string;
  children?: TComponentChildren;
};

export type TGetData = {
  endpoint: string;
  search?: string;
  fields?: string;
  limit?: number;
  sort?: string; // example "sort aggregated_rating desc"
  filter?: string; // example "genre = 2" or "id = (2254,5534,2523)"
  offset?: number;
};

export type TEndpoint = 'games' | 'characters' | 'companies';

export type TGetDataCount = {
  endpoint: TEndpoint;
  filter?: string;
};

export type TLinkPrefix = '../' | '';

export type TCardSize = 'default' | 'compact' | 'mini';

export type TCardsList = {
  endpoint?: string;
  search?: string;
  fields?: string;
  limit?: number;
  sort?: string;
  filter?: string;
  offset?: number;
  linkPrefix?: TLinkPrefix;
  cardSize?: TCardSize;
};

export type TGameCover = {
  image_id: string;
  url?: string;
};

export type TImage = {
  image_id: string;
  url?: string;
};

export type TGameVideo = {
  name: string;
  video_id: string;
};

export type TData = TGame & TCharacter & TCompany & TImage;

export type TGame = {
  id?: number;
  name?: string;
  aggregated_rating?: number;
  genres?: TNameAndID[];
  platforms?: {
    abbreviation: string;
  }[];
  cover?: TGameCover;
  coverSize?: string;
  storyline?: string;
  summary?: string;
  first_release_date?: number;
  screenshots?: TImage[];
  artworks?: TImage[];
  videos?: TGameVideo;
  similar_games?: number[];
};

export type TCharacter = {
  id?: number;
  name?: string;
  akas?: string[];
  mug_shot?: TImage;
  description?: string;
  games?: TGame[];
  gender?: number;
  species?: number;
  country_name?: string;
  cardSize?: TCardSize;
};

export type TCompany = {
  id?: number;
  name?: string;
  logo?: TImage;
  country?: number;
  description?: string;
  developed?: TGame[];
  published?: TGame[];
  start_date?: number;
  websites?: {
    url: string;
  }[];
  cardSize?: TCardSize;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TGameCard = TGame & {
  linkPrefix?: TLinkPrefix;
  cardSize?: TCardSize;
};

export type TCompanyCard = TCompany & {
  linkPrefix?: TLinkPrefix;
};

export type TCharacterCard = TCharacter & {
  linkPrefix?: TLinkPrefix;
};

export type TPagination = {
  keyID: string;
  pagesAmount: number;
  currentPage: number;
  length?: number;
};

export type TCatalogue = {
  endpoint: TEndpoint;
  category: string;
  title: string;
};

export type TUsePaginationData = {
  endpoint: TEndpoint;
  fetchLimit?: number;
  pageID: string | undefined;
  dataFilter?: string;
};

export type THandlePaginationRedirect = {
  navigate: NavigateFunction;
  currentPage: number;
  pagesAmount: number;
};

export type TExtractEnumData = {
  id: number | undefined;
  enumObject: any;
};

export type TCutLongString = {
  string: string;
  length: number;
  end?: string; // three dots at the end of the title for example
};

export type TTabs = {
  tabs: string[];
  children?: TComponentChildren[];
  title?: string | undefined;
};

export type TImageGallery = {
  endpoint: 'screenshots' | 'artworks';
  imageSize: string;
  fields?: string;
  limit?: number;
  filter?: string;
  text?: 'Image' | 'Screenshot' | 'Artwork';
};

export type TDataNotAvailable = {
  text?: string;
};

export type TImageSlider = {
  data: TData[] | undefined;
  imageSize: string;
  text: string;
  currentImage: number;
  setCurrentImage: Dispatch<SetStateAction<number>>;
};

export type TModal = {
  children: TComponentChildren;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
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
