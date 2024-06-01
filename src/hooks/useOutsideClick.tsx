import { RefObject, useEffect } from 'react';

export default function useOutsideClick(
  callback: Function,
  ref: RefObject<HTMLElement>
) {
  function onClick(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  });
}
