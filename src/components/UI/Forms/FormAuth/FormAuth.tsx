import { type TError } from '../../../../types/main';
import { type TAuthFormProps, type TAuthValues } from '../../../../types/auth';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  doCreateWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from '../../../../firebase/auth';
import { catchFetchError, validateForm } from '../../../../utils/utils';
import InputBlock from '../../Inputs/InputBlock/InputBlock';
import LoadingSimple from '../../LoadingSimple/LoadingSimple';
import { TInput } from '../../../../types/ui';
import ButtonDefault from '../../Buttons/ButtonDefault/ButtonDefault';
import useModal from '../../../hooks/useModal';

export default function FormAuth({ authType, setAuthType }: TAuthFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<TError | null>();
  const [isSuccess, setIsSuccess] = useState(false);
  const { isModalOpened, setIsModalOpened } = useModal();
  const [values, setValues] = useState<TAuthValues>({
    email: '',
    password: '',
  });

  // Resetting form when modal is opened/closed
  useEffect(() => {
    if (formRef.current) formRef.current.reset();
  }, [isModalOpened]);

  // Clearing fetch errors on authType change and values change
  useEffect(() => {
    setFetchError(null);
  }, [authType, values]);

  const inputs: TInput[] = useMemo(
    () => [
      {
        id: 1,
        attributes: {
          name: 'email',
          type: 'email',
          placeholder: 'name@mail.com',
          autoComplete: 'email',
          required: true,
        },
        label: {
          text: 'Email',
          className: 'form-auth__label',
        },
      },
      {
        id: 2,
        customError:
          'Password should be 8-20 characters long and also include at least 1 letter and 1 number and 1 special character!',
        attributes: {
          name: 'password',
          type: 'password',
          placeholder: '*********',
          autoComplete: 'password-new',
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },
        label: {
          text: 'Password',
          className: 'form-auth__label',
        },
      },
      {
        id: 3,
        customError: 'Passwords do not match!',
        alwaysValidate: true,
        attributes: {
          name: 'passwordConfirm',
          type: 'password',
          placeholder: '*********',
          pattern: values.password,
          required: true,
        },
        label: {
          text: 'Password confirmation',
          className: 'form-auth__label',
        },
      },
    ],
    [values.password]
  );

  function onChange(evt: ChangeEvent<HTMLInputElement>) {
    setValues(values && { ...values, [evt.target.name]: evt.target.value });
  }

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const isValid = validateForm(evt.target as HTMLFormElement);

    if (isValid) {
      setIsLoading(true);

      if (authType === 'signUp') {
        // SIGN UP with email and password
        doCreateWithEmailAndPassword(values.email, values.password)
          .then((userCredentials) => {
            if (userCredentials) setIsSuccess(true);
          })
          .catch((error) => catchFetchError(error, setFetchError))
          .finally(() => setIsLoading(false));

        return;
      } else if (authType === 'signIn') {
        // SIGN IN with email and password
        doSignInWithEmailAndPassword(values.email, values.password)
          .then((userCredentials) => {
            if (userCredentials) setIsSuccess(true);
          })
          .catch((error) => catchFetchError(error, setFetchError))
          .finally(() => setIsLoading(false));

        return;
      }
    }
  }

  return (
    <>
      {isSuccess ? (
        <div className="auth-success">
          <h2 className="auth-title">
            {authType === 'signIn'
              ? 'You successfully signed in!'
              : authType === 'signUp' &&
                'You successfully created new account!'}
          </h2>

          <ButtonDefault
            className="button-default"
            onClick={() => setIsModalOpened(false)}
          >
            Ok
          </ButtonDefault>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={(evt) => {
            onSubmit(evt);
          }}
          className="form-auth"
          noValidate
        >
          {/* TITLE */}
          <legend>
            <h2 className="auth-title">
              {authType === 'signUp'
                ? 'Create new account'
                : authType === 'signIn' && 'Sign In to your account'}
            </h2>
          </legend>

          {/* INPUTS */}
          <div className="form-auth__input-holder">
            {/* On loading blocker */}
            {isLoading && <div className="form-auth__blocker"></div>}

            {inputs.map((input) => {
              // Skipping passwordConfirm input when Sign In is active
              if (
                authType === 'signUp' ||
                input.attributes.name !== 'passwordConfirm'
              ) {
                return (
                  <InputBlock
                    key={input.id}
                    {...input}
                    value={values && values[input.attributes.name as string]}
                    onChange={onChange}
                    className="form-auth__input"
                    resetTrigger={authType}
                  />
                );
              }

              return undefined;
            })}
          </div>

          {/* SUBMIT BUTTON */}
          <ButtonDefault
            disabled={isLoading || fetchError ? true : false}
            className="button-default form-auth__button-submit"
            type="submit"
          >
            {isLoading ? (
              <div className="form-auth__loading-button">
                <LoadingSimple />
                Loading...
              </div>
            ) : authType === 'signUp' ? (
              'Sign up'
            ) : (
              authType === 'signIn' && 'Sign in'
            )}
          </ButtonDefault>

          {/* ERROR */}
          {fetchError && (
            <p className="form-auth__error">{fetchError?.message}</p>
          )}

          {/* ADDITIONAL INFO */}
          {authType === 'signUp' ? (
            <p className="form-auth__text">
              Already have an account?{' '}
              <ButtonDefault
                className="button-anchor"
                onClick={() => setAuthType('signIn')}
                type="button"
              >
                Sign in
              </ButtonDefault>
            </p>
          ) : (
            authType === 'signIn' && (
              <p className="form-auth__text">
                Don't have an account?{' '}
                <ButtonDefault
                  className="button-anchor"
                  onClick={() => setAuthType('signUp')}
                  type="button"
                >
                  Sign up
                </ButtonDefault>
              </p>
            )
          )}
        </form>
      )}
    </>
  );
}
