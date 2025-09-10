import { NavigateFunction } from 'react-router-dom';
import { TEndpoint } from './main';

export type TUsePagesCountProps = TPagesCountParams;

export type TUsePagination = TPagesCountParams;

export type TCreatePaginationUIProps = {
  pagesCount: number;
  pagesLimit?: number;
  currentPage: number;
};

export type TPagesCountParams = {
  endpoint: TEndpoint;
  fetchLimit?: number;
  dataFilter?: string;
  pagesLimit?: number;
};

export type THandlePaginationRedirect = {
  navigate: NavigateFunction;
  currentPage: number;
  pagesCount: number;
};
