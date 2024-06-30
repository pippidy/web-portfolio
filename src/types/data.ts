import { TCardSize } from './cards';
import { TEndpoint, TNameAndID } from './main';

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
  endpoint: string;
  search?: string;
  fields?: string;
  limit?: number;
  sort?: string; // example "sort aggregated_rating desc"
  filter?: string; // example "genre = 2" or "id = (2254,5534,2523)"
  offset?: number;
  signal?: AbortSignal;
};

export type TGetDataCount = {
  endpoint: TEndpoint;
  filter?: string;
  signal?: AbortSignal;
};
