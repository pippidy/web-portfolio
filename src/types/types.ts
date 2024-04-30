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

export type TLinkPath = '../' | '';

export type TCardSize = 'default' | 'compact' | 'mini';

export type TCardsList = {
  endpoint?: string;
  fields?: string;
  limit?: number;
  sort?: string;
  filter?: string;
  offset?: number;
  infoLinkPath?: TLinkPath;
  cardSize?: TCardSize;
};

export type TGameCover = {
  image_id: string;
  url: string;
};

export type TImage = {
  image_id: string;
  url?: string;
};

export type TGameVideo = {
  name: string;
  video_id: string;
};

export type TGameReleaseDates = {
  id?: number;
  human?: string;
  m?: number;
  y?: number;
};

export type TData = TGame & TCharacter & TCompany & TImage;

export type TGame = {
  id?: number;
  name?: string;
  aggregated_rating?: number;
  genres?: TNameAndID[];
  cover?: TGameCover;
  coverSize?: string;
  storyline?: string;
  summary?: string;
  release_dates?: TGameReleaseDates[];
  screenshots?: TImage[];
  artworks?: TImage[];
  videos?: TGameVideo;
  similar_games?: number[];
};

export type TCharacter = {
  id?: number;
  name?: string;
  akas?: string[];
  mug_shot?: {
    url: string;
  };
  description?: string;
  games?: TGame[];
  gender?: number;
  cardSize?: TCardSize;
};

export type TCompany = {
  id?: number;
  name?: string;
  logo?: {
    url: string;
  };
  country?: string;
  description?: string;
  developed?: TGame[];
  start_date?: string;
  websites?: number[];
  cardSize?: TCardSize;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TGameCard = TGame & {
  linkPath?: TLinkPath;
  cardSize?: TCardSize;
};

export type TPagination = {
  keyID: string;
  pagesAmount: number;
  currentPage: number;
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
  children?: TComponentChildren[];
  tabs: string[];
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
