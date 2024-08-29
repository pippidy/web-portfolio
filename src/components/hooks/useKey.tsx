import { useEffect } from 'react';

type TUseKey = {
  key: string;
  event: 'keypress' | 'keydown' | 'keyup';
  callback: Function;
};

export default function useKey({ key, event, callback }: TUseKey) {
  useEffect(() => {
    function handler(evt: KeyboardEvent) {
      if (evt.code === key) return callback();
    }

    document.addEventListener(event, handler);

    return () => document.removeEventListener(event, handler);
  }, [key, event, callback]);
}
