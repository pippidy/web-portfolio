export function handleFetchResults(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
