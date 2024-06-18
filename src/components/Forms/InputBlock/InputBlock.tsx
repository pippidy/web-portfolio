import {
  ChangeEvent,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { TError, TInputElement } from '../../../types/types';
import ModalContext from '../../../contexts/ModalContext';
import cn from 'classnames';

export default function InputBlock({
  customError = '',
  className = '',
  onChange,
  value,
  resetTrigger,
  attributes,
  label,
}: TInputElement) {
  const [isError, setIsError] = useState<TError>({ status: false });
  const isModalOpened = useContext(ModalContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  let mainClass = cn(`${className} input-block`, {
    error: isError.status,
  });

  // Resetting input when parent component changes trigger or when parent modal is closed/opened
  useEffect(() => {
    setIsError({ status: false });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [resetTrigger, isModalOpened]);

  function validateInput(evt: ChangeEvent<HTMLInputElement>) {
    const input = evt.currentTarget;
    const valid = input.validity.valid;

    if (!valid) {
      // Setting custom message on pattern mismatch
      if (input.validity.patternMismatch) {
        input.setCustomValidity(customError);
      } else {
        input.setCustomValidity('');
      }

      setIsError({
        status: true,
        message: input.validationMessage,
      });
    } else {
      setIsError({ status: false });
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
          if (isError.status) validateInput(evt); // If error has been shown start dynamic validation on change
          onChange && onChange(evt);
        }}
        onBlur={(evt) => {
          validateInput(evt);
        }}
        onReset={() => {
          console.log(123);
        }}
        {...attributes}
      />

      {/** ERROR */}
      <span className="input-block__error">{isError.message}</span>
    </div>
  );
}
