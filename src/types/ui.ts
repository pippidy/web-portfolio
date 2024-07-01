import { ButtonHTMLAttributes } from 'react';
import { TComponentChildren } from './main';

export type TInput = {
  id?: number | string;
  customError?: string;
  className?: string;
  onChange?: Function;
  resetTrigger?: string | number | boolean;
  value?: string;
  // TODO: Use corresponding React type
  attributes: {
    name: string;
    type: string;
    placeholder?: string;
    autoComplete?: string;
    pattern?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
  };
  label?: TLabel;
};

export type TLabel = {
  text: string;
  for?: string;
  className?: string;
};

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  onClick?: Function;
  children?: TComponentChildren;
};
