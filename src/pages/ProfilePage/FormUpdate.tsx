import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { validateForm } from '../../utils/utils';
import { doUpdateProfile } from '../../firebase/auth';
import { TError } from '../../types/main';
import LoadingSimple from '../../components/UI/LoadingSimple/LoadingSimple';
import Button from '../../components/UI/Buttons/Button/Button';

export default function FormUpdate({
  setter,
  type,
}: {
  type: string;
  setter: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<TError>({ status: false });
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Markup data
  const config = useMemo(() => {
    return {
      id: `update-${type}`,
      label: `Update your ${type}`,
      name: type,
      type: type === 'avatar' ? 'url' : 'text',
      placeholder:
        type === 'avatar'
          ? 'www.imagehost/image123...'
          : '2-24 characters long...',
      length: {
        min: type === 'username' ? 2 : undefined,
        max: type === 'username' ? 24 : undefined,
      },
      autocomplete: type === 'username' ? 'username' : '',
    };
  }, [type]);

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const isValid = validateForm(evt.target as HTMLFormElement);

    if (isValid) {
      setIsLoading(true);

      doUpdateProfile({
        userName: type === 'username' ? value : undefined,
        userAvatar: type === 'avatar' ? value : undefined,
      })
        .then(() => {
          setter(value);
          formRef.current && formRef.current.reset();
        })
        .finally(() => {
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 2000);
          setValue('');
          setIsLoading(false);
        });
    } else {
      if (inputRef.current) {
        setError({
          status: true,
          message: inputRef.current.validationMessage,
        });
      }
    }
  }

  function onChange(evt: ChangeEvent<HTMLInputElement>) {
    setValue(evt.target.value);
    if (error && evt.target.validity.valid) setError({ status: false });
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
      <div
        className={`input-block ${
          error.status ? 'error' : isSuccess ? 'success' : ''
        }`}
      >
        <label htmlFor={config.id} className={isSuccess ? 'success' : ''}>
          {config.label}
        </label>

        <div className="profile-menu__form-input-holder">
          <input
            ref={inputRef}
            id={config.id}
            name={config.name}
            type={config.type}
            placeholder={isLoading ? 'Loading...' : config.placeholder}
            minLength={config.length.min}
            maxLength={config.length.max}
            autoComplete={config.autocomplete}
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
          <span className="input-block__error">{error.message}</span>
        </div>
      </div>

      <Button
        disabled={(!value.length || error.status) && true}
        type="submit"
        className="profile-menu__form-submit"
      >
        {isLoading ? <LoadingSimple /> : 'Apply'}
      </Button>
    </form>
  );
}
