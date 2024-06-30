import { Dispatch, SetStateAction } from 'react';
import { TComponentChildren } from './main';

export type TModal = TModalControl & {
  children: TComponentChildren;
  classList?: string; // Custom classes separeted by a space
};

export type TModalControl = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

export type TDefaultModalBlock = {
  children?: TComponentChildren;
};
