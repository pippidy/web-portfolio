import { TDataFull, TGetData, TGetDataCount } from '../types/data';
import { TConfigAPI, TCategory } from '../types/main';
import { handleFetchResults } from '../utils/utils';

const userID = 'owlnvuu4x73puzega7fmhzymfe3voy';
const clientSecret = 'iiuek5lwve85c4z713d5o6bbmpaccm';

// Getting API access token
async function fetchAuth(): Promise<void | { access_token: string }> {
  return fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${userID}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: 'POST',
    }
  )
    .then((res) => handleFetchResults(res))
    .then((data) => data);
}

const auth = await fetchAuth();
const configAPI: TConfigAPI = {
  baseURL: process.env.REACT_APP_PROXY_PREFIX || '', // Proxy prefix is used for production only
  headers: {
    Authorization: `Bearer ${auth?.access_token}`,
    'Client-ID': userID,
    'Content-Type': 'application/json',
  },
};

export const getData = async ({
  apiOptions,
  signal,
}: TGetData): Promise<TDataFull[] | undefined> => {
  const { endpoint, search, fields, filter, limit, sort, offset } = apiOptions;

  // Query example: "fields name,cover.image_id,videos.*,screenshots.*,aggregated_rating; limit 6; sort first_release_date desc; where aggregated_rating > 0;"
  // TODO: Refactor it
  const body = `${search ? `search "${search}";` : ''}fields ${fields}; ${
    limit ? `limit ${limit};` : ''
  } ${sort ? `sort ${sort};` : ''} ${filter ? `where ${filter};` : ''} ${
    offset ? `offset ${offset};` : ''
  }`;

  return fetch(configAPI.baseURL + `/${endpoint}`, {
    method: 'POST',
    headers: configAPI.headers,
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
}: TGetDataCount) => {
  return fetch(configAPI.baseURL + `/${endpoint}/count`, {
    method: 'POST',
    headers: configAPI.headers,
    body: `${filter};`,
    signal: signal,
  }).then((res) => {
    return handleFetchResults(res);
  });
};

export const getCategories = async (
  category: string,
  signal?: AbortSignal
): Promise<TCategory[] | undefined> => {
  return fetch(configAPI.baseURL + `/${category}`, {
    method: 'POST',
    headers: configAPI.headers,
    body: `fields name;`,
    signal: signal,
  }).then((res) => handleFetchResults(res));
};
