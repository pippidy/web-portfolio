import { RefObject, useEffect } from 'react';

export default function useOutsideClick(
  callback: Function,
  ref: RefObject<HTMLElement>
) {
  function handleClick(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
