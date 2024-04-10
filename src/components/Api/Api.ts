import {
  TConfigAPI,
  TGame,
  TGenre,
  TGetGames,
  TGetGamesCount,
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

export const getGames = (props: TGetGames): Promise<TGame[] | undefined> => {
  const { limit, sort, filter, offset } = props;

  // query example "fields name,cover.image_id,videos.*,screenshots.*,aggregated_rating; limit 6; sort first_release_date desc; where aggregated_rating > 0;"
  const body = `fields name,cover.image_id,videos.*,screenshots.*,aggregated_rating; ${
    limit ? `limit ${limit};` : ''
  } ${sort ? `sort ${sort};` : ''} ${filter ? `where ${filter};` : ''} ${
    offset ? `offset ${offset};` : ''
  }`;

  return fetch(`${configAPI.baseURL}/games`, {
    method: 'POST',
    headers: configAPI.headers,
    body: body,
  }).then((res) => {
    return handleFetchResults(res);
  });
};

export const getGamesCount = (props: TGetGamesCount) => {
  const { id, query } = props;
  const body = id === 'all' ? '' : `where ${query} = ${id};`;

  return fetch(`${configAPI.baseURL}/games/count`, {
    method: 'POST',
    headers: configAPI.headers,
    body: body,
  }).then((res) => {
    return handleFetchResults(res);
  });
};

export const getGenres = (): Promise<TGenre[] | undefined> => {
  return fetch(`${configAPI.baseURL}/genres`, {
    method: 'POST',
    headers: configAPI.headers,
    body: `fields name;`,
  })
    .then((res) => handleFetchResults(res))
    .then((data) => data);
};
