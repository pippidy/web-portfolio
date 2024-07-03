import { TCardSize } from './cards';
import { TApiOptions, TEndpoint, TNameAndID } from './main';

export type TDataFull = TDataGame & TDataCharacter & TDataCompany & TDataImage;

export type TData = {
  id?: number;
  name?: string;
  cardSize?: TCardSize;
};

export type TDataGame = TData & {
  aggregated_rating?: number;
  genres?: TNameAndID[];
  platforms?: {
    abbreviation: string;
  }[];
  cover?: TDataImage;
  coverSize?: string;
  storyline?: string;
  summary?: string;
  first_release_date?: number;
  screenshots?: TDataImage[];
  artworks?: TDataImage[];
  videos?: TDataVideo;
  similar_games?: number[];
};

export type TDataCharacter = TData & {
  akas?: string[];
  mug_shot?: TDataImage;
  description?: string;
  games?: TDataGame[];
  gender?: number;
  species?: number;
  country_name?: string;
};

export type TDataCompany = TData & {
  logo?: TDataImage;
  country?: number;
  description?: string;
  developed?: TDataGame[];
  published?: TDataGame[];
  start_date?: number;
  websites?: {
    url: string;
  }[];
};

export type TDataImage = {
  image_id: string;
  url?: string;
};

export type TDataVideo = {
  video_id: string;
  name: string;
};

export type TGetData = {
  apiOptions: TApiOptions;
  signal?: AbortSignal;
};

export type TUseGetDataProps = TApiOptions & {
  pageID?: string | number; // The dependency used inside info pages only so far
};

export type TGetDataCount = {
  endpoint: TEndpoint;
  filter?: string;
  signal?: AbortSignal;
};
