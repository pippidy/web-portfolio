export type TInputElement = {
  id?: number | string;
  customError?: string;
  className?: string;
  onChange?: Function;
  resetTrigger?: string | number | boolean;
  value?: string;
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
  label?: TLabelElement;
};

export type TLabelElement = {
  text: string;
  for?: string;
  className?: string;
};
