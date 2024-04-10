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

export type TGetGames = {
  limit?: number;
  sort?: string; // example "sort aggregated_rating desc"
  filter?: string; // example "where genre = 2"
  offset?: number;
};

export type TGetGamesCount = {
  id: string | number | undefined;
  query: string;
};

export type TGameCardsListProps = {
  limit: number;
  sort: string;
  filter: string;
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
};

export type TGenre = {
  id: number;
  name: string;
};

export type TPaginationProps = {
  id: string;
  pagesAmount: number;
};
