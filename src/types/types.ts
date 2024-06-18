import { User as TUserFirebase } from 'firebase/auth';
import React, { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type TComponentChildren = React.ReactNode;

export type TEndpoint = 'games' | 'characters' | 'companies';

export type TError = {
  status?: boolean;
  code?: number;
  message?: string;
};

export type TInputElement = {
  id?: number | string;
  customError?: string;
  className?: string;
  onChange?: Function;
  resetTrigger?: string | number | boolean;
  value?: string;
  attributes: {
    name: string;
    type: string;
    placeholder?: string;
    autoComplete?: string;
    pattern?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
  };
  label?: TLabelElement;
};

export type TLabelElement = {
  text: string;
  for?: string;
  className?: string;
};

export type TNameAndID = {
  id?: number;
  name?: string;
};

export type TConfigAPI = {
  baseURL: string;
  headers: {};
};

export type TCatalogue = {
  endpoint: TEndpoint;
  category: string;
  title: string;
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
  title?: string | null | undefined;
};

export type TDataNotAvailable = {
  text?: string;
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

// DATA
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

export type TGameCover = {
  image_id: string;
  url?: string;
};

export type TGameVideo = {
  name: string;
  video_id: string;
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

export type TImage = {
  image_id: string;
  url?: string;
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

export type TGetDataCount = {
  endpoint: TEndpoint;
  filter?: string;
};

// CARDS
export type TLinkPrefix = '../' | '';

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

// SECTION
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

// IMAGES
export type TImageGallery = {
  endpoint: 'screenshots' | 'artworks';
  imageSize: string;
  fields?: string;
  limit?: number;
  filter?: string;
  text?: 'Image' | 'Screenshot' | 'Artwork';
};

export type TImageSlider = {
  data: TData[] | undefined;
  imageSize: string;
  text: string;
  currentImage: number;
  setCurrentImage: Dispatch<SetStateAction<number>>;
};

// MODAL
export type TModal = TModalControl & {
  children: TComponentChildren;
  classList?: string; // Custom classes separeted by a space
};

export type TModalControl = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

export type TDefaultModalBlock = {
  children?: TComponentChildren;
};

// PAGINATION
export type TPagination = {
  keyID: string;
  pagesAmount: number;
  currentPage: number;
  length?: number;
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

// AUTHENTICATION
export type TAuthType = 'signUp' | 'signIn';
export type TUser = TUserFirebase | undefined | null;

export type TAuthForm = {
  authType: TAuthType;
  setAuthType: Dispatch<SetStateAction<TAuthType>>;
  modal: TModalControl;
};

export type TProtectedRoute = {
  children: TComponentChildren;
  user: TUser;
};

export type TAuthContext = {
  currentUser: TUser;
  userSignedIn: boolean;
  loading: boolean;
} | null;

export type TAuthValues = {
  [key: string]: string | undefined; // index signature
  email: string;
  password: string;
};

export type TSignOutButton = {
  children: TComponentChildren;
  className?: string;
};
