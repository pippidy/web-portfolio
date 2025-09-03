import { type TCategory } from '../../types/main';
import {
  type TDataCount,
  type TGetCategories,
  type TDataFull,
  type TGetData,
  type TGetDataCount,
} from '../../types/data';
import { handleFetchResults } from '../../utils/utils';
import { createAPIConfig } from './config';

const config = await createAPIConfig();

export const getData = async ({
  queryParams,
  signal,
}: TGetData): Promise<TDataFull[] | undefined> => {
  const { endpoint, search, fields, filter, limit, sort, offset } = queryParams;

  // Creating separate queries to concatenate them into body later
  const querySearch = search ? `search "${search}";` : '';
  const queryFields = `fields ${fields};`;
  const queryLimit = limit ? `limit ${limit};` : '';
  const querySort = sort
    ? `sort ${sort.property} ${sort.order ? sort.order : 'asc'};`
    : '';
  const queryFilter = filter ? `where ${filter};` : '';
  const queryOffset = offset ? `offset ${offset};` : '';

  // Body example: "fields name,cover.image_id,videos.*,screenshots.*,aggregated_rating; limit 6; sort first_release_date desc; where aggregated_rating > 0;"
  const body = `${querySearch} ${queryFields} ${queryLimit} ${querySort} ${queryFilter} ${queryOffset}`;

  return fetch(config.baseURL + `/${endpoint}`, {
    method: 'POST',
    headers: config.headers,
    body: body,
    signal: signal,
  }).then((res) => {
    return handleFetchResults(res);
  });
};

// Query example: "where genre = 2"
export const getDataCount = async ({
  endpoint,
  filter,
  signal,
}: TGetDataCount): Promise<TDataCount | undefined> => {
  return fetch(config.baseURL + `/${endpoint}/count`, {
    method: 'POST',
    headers: config.headers,
    body: `${filter};`,
    signal: signal,
  }).then((res) => handleFetchResults(res));
};

export const getCategories = async ({
  category,
  signal,
}: TGetCategories): Promise<TCategory[] | undefined> => {
  return fetch(config.baseURL + `/${category}`, {
    method: 'POST',
    headers: config.headers,
    body: `fields name;`,
    signal: signal,
  }).then((res) => handleFetchResults(res));
};
