import {
  type TCutLongString,
  type TError,
  type TFormatDate,
  type TGetCountryFromISO,
} from '../types/main';
import iso from 'iso-3166-1';

export function handleFetchResults(res: Response): Promise<any> | undefined {
  if (res.ok) {
    return res.json();
  }
}

export function handleError(error: TError, callback?: Function) {
  if (error.code === 20) return; // Do not handle signal abortion errors

  const errorObj: TError = {
    code: error.code ? error.code : 'unknown',
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
  format = 'full',
}: TGetCountryFromISO): string {
  const res = iso.whereNumeric(isoCode);

  if (res) {
    let countryName = '';

    if (format === 'full') countryName = res.country;
    if (format === 'medium') countryName = res.alpha3;
    if (format === 'short') countryName = res.alpha2;

    return countryName;
  }
  return 'n/a';
}

export function validateForm(form: HTMLFormElement): boolean {
  const inputsArray = form.querySelectorAll('input');
  inputsArray.forEach((_, i) => !inputsArray[i].validity.valid && false);
  return true;
}

export function countPaginationOffset(
  currentPage: number,
  fetchLimit: number
): number {
  currentPage = --currentPage;
  return currentPage * fetchLimit;
}
