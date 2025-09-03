import { type TConfigAPI } from '../../types/main';
import { handleFetchResults } from '../../utils/utils';

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

export async function createAPIConfig() {
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
