import { type TError } from '../../../../types/main';
import { type TInput } from '../../../../types/ui';
import { ChangeEvent, useEffect, useId, useRef, useState } from 'react';
import cn from 'classnames';
import useModal from '../../../../hooks/useModal';

export default function InputBlock({
  customError = '',
  className = '',
  onChange,
  value,
  resetTrigger,
  attributes,
  label,
}: TInput) {
  const [error, setError] = useState<TError | null>(null);
  const isModalOpened = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  let mainClass = cn(`${className} input-block`, {
    error: error,
  });

  // Resetting input on trigger or when parent modal is closed/opened
  useEffect(() => {
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [resetTrigger, isModalOpened]);

  function validateInput(evt: ChangeEvent<HTMLInputElement>) {
    const input = evt.target;
    const isValid = input.validity.valid;

    if (!isValid) {
      // Setting custom message on pattern mismatch
      input.setCustomValidity(
        input.validity.patternMismatch ? customError : ''
      );

      setError({
        message: input.validationMessage,
      });
    } else {
      setError(null);
    }
  }

  return (
    <div className={mainClass}>
      {/** LABEL */}
      {label && <label htmlFor={id}>{label.text}</label>}

      {/** INPUT */}
      <input
        ref={inputRef}
        id={id}
        onChange={(evt) => {
          onChange && onChange(evt);
          if (error) validateInput(evt);
        }}
        onInput={(evt: ChangeEvent<HTMLInputElement>) => {
          evt.target.setCustomValidity('');
        }}
        onBlur={(evt) => {
          validateInput(evt);
        }}
        {...attributes}
      />

      {/** ERROR */}
      <span className="input-block__error">{error && error.message}</span>
    </div>
  );
}
