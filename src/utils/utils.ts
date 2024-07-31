import {
  type TCutLongString,
  type TError,
  type TFormatDate,
  type TGetCountryFromISO,
} from '../types/main';
import iso from 'iso-3166-1';

export function handleFetchResults(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function catchFetchError(error: TError, callback?: Function) {
  const errorObj = {
    status: true,
    code: typeof error === 'string' ? 'unknown' : error.code,
    message: typeof error === 'string' ? error : error.message,
  };

  if (callback) {
    callback(errorObj);
  }

  console.error(
    'ERROR',
    `code: ${errorObj.code} |`,
    `text: ${errorObj.message}`
  );
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

  if (res) {
    let countryName = '';

    if (length === 'full') countryName = res.country;
    if (length === 'medium') countryName = res.alpha3;
    if (length === 'short') countryName = res.alpha2;

    return countryName;
  }

  return 'n/a';
}

export function validateForm(form: HTMLFormElement): boolean {
  const inputsArray = form.querySelectorAll('input');

  for (let i = 0; i < inputsArray.length; i++) {
    if (!inputsArray[i].validity.valid) return false;
  }

  return true;
}
