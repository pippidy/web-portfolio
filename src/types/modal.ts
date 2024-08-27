import { Dispatch, SetStateAction } from 'react';
import { TComponentChildren } from './main';

export type TModalProps = TModalControl & {
  children: TComponentChildren<React.ReactNode>;
  classList?: string; // Custom classes separeted by a space
};

export type TModalControl = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

export type TDefaultModalBlockProps = {
  children?: TComponentChildren<React.ReactNode>;
};
