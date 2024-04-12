import {
  TConfigAPI,
  TGame,
  TCategory,
  TGetData,
  TGetDataCount,
} from '../../types/types';

const userID = 'owlnvuu4x73puzega7fmhzymfe3voy';
const clientSecret = 'iiuek5lwve85c4z713d5o6bbmpaccm';

export function handleFetchResults(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

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

const auth = await fetchAuth();
const configAPI: TConfigAPI = {
  baseURL: 'https://thingproxy.freeboard.io/fetch/https://api.igdb.com/v4',
  headers: {
    Authorization: `Bearer ${auth?.access_token}`,
    'Client-ID': userID,
    'Content-Type': 'application/json',
  },
};

export const getData = (props: TGetData): Promise<TGame[] | undefined> => {
  const { endpoint, limit, sort, filter, offset, fields } = props;

  // query example "fields name,cover.image_id,videos.*,screenshots.*,aggregated_rating; limit 6; sort first_release_date desc; where aggregated_rating > 0;"
  const body = `${fields ? `fields ${fields};` : ''} ${
    limit ? `limit ${limit};` : ''
  } ${sort ? `sort ${sort};` : ''} ${filter ? `where ${filter};` : ''} ${
    offset ? `offset ${offset};` : ''
  }`;

  return fetch(`${configAPI.baseURL}/${endpoint}`, {
    method: 'POST',
    headers: configAPI.headers,
    body: body,
  }).then((res) => {
    return handleFetchResults(res);
  });
};

// Query example "where genre = 2"
export const getDataCount = (props: TGetDataCount) => {
  const { endpoint, filter } = props;

  return fetch(`${configAPI.baseURL}/${endpoint}/count`, {
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
  return fetch(`${configAPI.baseURL}/${category}`, {
    method: 'POST',
    headers: configAPI.headers,
    body: `fields name;`,
  })
    .then((res) => handleFetchResults(res))
    .then((data) => data);
};