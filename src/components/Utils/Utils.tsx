import { TCutLongString, TExtractEnumData } from '../../types/types';

export function handleFetchResults(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function extractEnumData({ id, enumObject }: TExtractEnumData) {
  if (!id) return undefined;
  return enumObject[id];
}

export function cutLongString({ string, length, end }: TCutLongString): string {
  return string.length > length
    ? `${string.substring(0, length)}${end}`
    : string;
}
