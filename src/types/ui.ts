import { type ComponentProps } from 'react';
import { type TComponentChildren } from './main';

export type TInput = {
  id?: number | string;
  customError?: string;
  className?: string;
  onChange?: Function;
  alwaysValidate?: boolean;
  resetTrigger?: string | number | boolean;
  value?: string;
  attributes: ComponentProps<'input'>;
  label?: TLabel;
};

export type TLabel = {
  text: string;
  for?: string;
  className?: string;
};

export type TButton = ComponentProps<'button'> & {
  className?: string;
  onClick?: Function;
  children?: TComponentChildren<React.ReactNode>;
};
