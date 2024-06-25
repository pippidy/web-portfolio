import {
  TConfigAPI,
  TCategory,
  TGetData,
  TGetDataCount,
  TData,
} from '../types/types';
import { handleFetchResults } from '../utils/utils';

const userID = 'owlnvuu4x73puzega7fmhzymfe3voy';
const clientSecret = 'iiuek5lwve85c4z713d5o6bbmpaccm';

// Getting API access token
function fetchAuth(): Promise<void | { access_token: string }> {
  return fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${userID}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: 'POST',
    }
  )
    .then((res) => handleFetchResults(res))
    .then((data) => data);
}

// Free CORS proxy https://thingproxy.freeboard.io/fetch/
const auth = await fetchAuth();
const configAPI: TConfigAPI = {
  baseURL: 'https://api.igdb.com/v4',
  headers: {
    Authorization: `Bearer ${auth?.access_token}`,
    'Client-ID': userID,
    'Content-Type': 'application/json',
  },
};

export const getData = ({
  endpoint,
  search,
  fields = '*',
  filter,
  limit,
  sort,
  offset,
}: TGetData): Promise<TData[] | undefined> => {
  // Query example: "fields name,cover.image_id,videos.*,screenshots.*,aggregated_rating; limit 6; sort first_release_date desc; where aggregated_rating > 0;"
  const body = `${search ? `search "${search}";` : ''}fields ${fields}; ${
    limit ? `limit ${limit};` : ''
  } ${sort ? `sort ${sort};` : ''} ${filter ? `where ${filter};` : ''} ${
    offset ? `offset ${offset};` : ''
  }`;

  return fetch(`/${endpoint}`, {
    method: 'POST',
    headers: configAPI.headers,
    body: body,
  }).then((res) => {
    return handleFetchResults(res);
  });
};

// Query example: "where genre = 2"
export const getDataCount = (props: TGetDataCount) => {
  const { endpoint, filter } = props;

  return fetch(`/${endpoint}/count`, {
    method: 'POST',
    headers: configAPI.headers,
    body: `${filter};`,
  }).then((res) => {
    return handleFetchResults(res);
  });
};

export const getCategories = (
  category: string
): Promise<TCategory[] | undefined> => {
  return fetch(`/${category}`, {
    method: 'POST',
    headers: configAPI.headers,
    body: `fields name;`,
  }).then((res) => handleFetchResults(res));
};
