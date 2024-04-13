import React from 'react';
import { NavigateFunction } from 'react-router-dom';

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

export type TEndpoint = 'games' | 'characters' | 'companies';

export type TGetDataCount = {
  endpoint: TEndpoint;
  filter?: string;
};

export type TGameCardsListProps = {
  endpoint?: string; // default is 'games'
  fields?: string;
  limit: number;
  sort?: string;
  filter?: string;
  offset?: number;
  // Choose either compact or mini
  compact?: boolean;
  mini?: boolean;
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
  name: string;
  cover?: TGameCover;
  coverSize?: string;
  screenshots?: TGameScreenshot[];
  videos?: TGameVideo;
  summary?: string;
  story?: string;
  aggregated_rating?: number;
  release_dates?: TGameReleaseDates[];
};

export type TCharacter = {
  id?: number;
  name: string;
  akas?: string[];
  mug_shot?: {
    url: string;
  };
  description?: string;
  games?: TGame[];
  gender?: number;
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
  endpoint: TEndpoint;
  category: string;
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
