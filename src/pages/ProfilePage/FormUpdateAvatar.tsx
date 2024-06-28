import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { validateForm } from '../../utils/utils';
import { doUpdateProfile } from '../../firebase/auth';
import { TError } from '../../types/types';
import LoadingSimple from '../../components/UI/LoadingSimple/LoadingSimple';

export default function FormUpdateAvatar({
  setAvatar,
}: {
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<TError>({ status: false });
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const isValid = validateForm(evt.target as HTMLFormElement);

    if (isValid) {
      setIsLoading(true);

      doUpdateProfile({ userName: undefined, userAvatar: value })
        .then(() => {
          setAvatar(value);
        })
        .then(() => {
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 2000);
          if (inputRef.current) inputRef.current.value = '';
        })
        .finally(() => setIsLoading(false));
    } else {
      if (inputRef.current) {
        setIsError({
          status: true,
          message: inputRef.current.validationMessage,
        });
      }
    }
  }

  function onChange(evt: ChangeEvent<HTMLInputElement>) {
    setValue(evt.target.value);
    if (isError && evt.target.validity.valid) setIsError({ status: false });
  }

  return (
    <form
      ref={formRef}
      onSubmit={(evt) => {
        onSubmit(evt);
      }}
      className="profile-menu__form"
      noValidate
    >
      <div className="input-block">
        <label htmlFor="update-avatar" className={isSuccess ? 'success' : ''}>
          Update your avatar
        </label>

        <div className="profile-menu__form-input-holder">
          <input
            ref={inputRef}
            id="update-avatar"
            name="avatar"
            className={isError.status ? 'error' : isSuccess ? 'success' : ''}
            type="url"
            placeholder={isLoading ? 'Loading...' : 'www.imagehost/image123...'}
            autoComplete="username"
            onChange={(evt) => {
              onChange(evt);
            }}
          />

          <span
            className="input-block__success"
            style={{ opacity: isSuccess ? 1 : 0 }}
          >
            Done!
          </span>

          <span className="input-block__error">{isError.message}</span>
        </div>
      </div>

      <button
        disabled={(!value.length || isError.status) && true}
        type="submit"
        className="profile-menu__form-submit"
      >
        {isLoading ? <LoadingSimple /> : 'Apply'}
      </button>
    </form>
  );
}
