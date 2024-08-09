import { NavigateFunction } from 'react-router-dom';
import { TEndpoint } from './main';

export type TPaginationProps = {
  pagesAmount: number;
  pagesLimit?: number;
  currentPage: number;
};

export type TUsePaginationData = {
  endpoint: TEndpoint;
  fetchLimit?: number;
  pageID?: string | undefined;
  dataFilter?: string;
};

export type THandlePaginationRedirect = {
  navigate: NavigateFunction;
  currentPage: number;
  pagesAmount: number;
};
