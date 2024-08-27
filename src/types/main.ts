import React, { ReactElement } from 'react';

export type TApiOptions = {
  endpoint: TEndpoint;
  fields: string;
  search?: string;
  sort?: TSort;
  filter?: string; // example "genre = 2" or "id = (2254,5534,2523)"
  limit?: number;
  offset?: number;
};

export type TSort = {
  property: string;
  order?: 'desc' | 'asc';
};

export type TComponentChildren<T extends React.ReactNode> = T;

export type TEndpoint =
  | 'games'
  | 'characters'
  | 'companies'
  | 'screenshots'
  | 'artworks';

export type TError = {
  code?: number | string;
  message?: string;
};

export type TNameAndID = {
  id?: number;
  name?: string;
};

export type TConfigAPI = {
  baseURL: string;
  headers: Record<string, string>;
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

export type TCategory = TNameAndID;

export type TInfoItemProps = {
  name: string;
  children: TComponentChildren<React.ReactNode>;
};

export type TContactsItem = {
  title: string;
  children: TComponentChildren<React.ReactNode>;
};
