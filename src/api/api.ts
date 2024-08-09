import { type TConfigAPI, type TCategory } from '../types/main';
import {
  type TDataCount,
  type TGetCategories,
  type TDataFull,
  type TGetData,
  type TGetDataCount,
} from '../types/data';
import { handleFetchResults } from '../utils/utils';

const userID = process.env.REACT_APP_IGDB_USER_ID;
const clientSecret = process.env.REACT_APP_IGDB_CLIENT_SECRET;

async function fetchAuth() {
  return fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${userID}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: 'POST',
    }
  ).then((res) => {
    return handleFetchResults(res);
  });
}

async function createConfig() {
  const auth = await fetchAuth();
  const config: TConfigAPI = {
    baseURL: process.env.REACT_APP_PROXY_PREFIX || '', // Proxy prefix is used for production only
    headers: {
      Authorization: `Bearer ${auth?.access_token}`,
      'Client-ID': userID ? userID : '',
      'Content-Type': 'application/json',
    },
  };

  return config;
}

export const getData = async ({
  apiOptions,
  signal,
}: TGetData): Promise<TDataFull[] | undefined> => {
  const { endpoint, search, fields, filter, limit, sort, offset } = apiOptions;
  const config = await createConfig();

  const querySearch = search ? `search "${search}";` : '';
  const queryFields = `fields ${fields};`;
  const queryLimit = limit ? `limit ${limit};` : '';
  const querySort = sort
    ? `sort ${sort.property} ${sort.order ? sort.order : 'asc'};`
    : '';
  const queryFilter = filter ? `where ${filter};` : '';
  const queryOffset = offset ? `offset ${offset};` : '';

  // Body example: "fields name,cover.image_id,videos.*,screenshots.*,aggregated_rating; limit 6; sort first_release_date desc; where aggregated_rating > 0;"
  // You have to separate each query with a ";"
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
  const config = await createConfig();

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
  const config = await createConfig();

  return fetch(config.baseURL + `/${category}`, {
    method: 'POST',
    headers: config.headers,
    body: `fields name;`,
    signal: signal,
  }).then((res) => handleFetchResults(res));
};
