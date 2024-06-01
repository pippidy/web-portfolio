import iso from 'iso-3166-1';
import {
  TCutLongString,
  TExtractEnumData,
  TError,
  TFormatDate,
  TGetCountryFromISO,
} from '../../types/types';

export function handleFetchResults(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function catchFetchError(error: TError, callback?: Function) {
  const errorObj = {
    errorCode: error.code,
    errorMessage: error.message,
  };

  if (callback) {
    callback(errorObj);
  }

  console.log(error.code, error.message);
}

export function extractEnumData({ id, enumObject }: TExtractEnumData) {
  if (!id) return undefined;
  return enumObject[id];
}

export function cutLongString({
  string,
  length,
  end = '...',
}: TCutLongString): string {
  return string.length > length
    ? `${string.substring(0, length)}${end}`
    : string;
}

export function formatDate({
  timestamp,
  options,
  locale = 'en-US',
}: TFormatDate): string {
  if (timestamp) {
    let unixTime = timestamp * 1000;

    if (!options) {
      options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };
    }

    return new Date(unixTime).toLocaleString(locale, options);
  }
  return 'n/a';
}

export function getCountryFromISO({
  isoCode,
  length = 'full',
}: TGetCountryFromISO): string {
  const res = iso.whereNumeric(isoCode);
  let countryName = '';

  if (res) {
    if (length === 'full') countryName = res.country;
    if (length === 'medium') countryName = res.alpha3;
    if (length === 'short') countryName = res.alpha2;

    return countryName;
  }

  return 'n/a';
}
