import React from 'react';

export type TSectionHeaderProps = {
  title: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TConfigAPI = {
  baseURL: string;
  headers: {};
};

export type TSectionProps = {
  title: string;
  children?: React.ReactNode;
};

export type TGetData = {
  endpoint: string;
  fields?: string;
  limit?: number;
  sort?: string; // example "sort aggregated_rating desc"
  filter?: string; // example "where genre = 2"
  offset?: number;
};

export type TGetDataCount = {
  endpoint: 'games' | 'characters';
  filter?: string;
};

export type TGameCardsListProps = {
  endpoint?: string; // default is 'games'
  fields?: string;
  limit: number;
  sort?: string;
  filter?: string;
  compact?: boolean;
  offset?: number;
};

export type TGameCover = {
  image_id: string;
};

export type TGameScreenshot = {
  image_id: string;
  url: string;
};

export type TGameVideo = {
  name: string;
  video_id: string;
};

export type TGameReleaseDates = {
  id?: number;
  human?: string;
  y?: number;
};

export type TGame = {
  id?: number;
  name?: string;
  cover?: TGameCover;
  coverSize: string;
  screenshots?: TGameScreenshot[];
  videos?: TGameVideo;
  summary?: string;
  story?: string;
  aggregated_rating?: number;
  release_dates?: TGameReleaseDates[];
};

export type TCategory = {
  id: number;
  name: string;
};

export type TPaginationProps = {
  keyID: string;
  pagesAmount: number;
  currentPage: number;
};

export type TCatalogue = {
  endpoint?: string; // default is 'games'
  category: string;
};

export type TUsePaginationData = {
  pageID: string | undefined;
  dataFilter?: string;
};
