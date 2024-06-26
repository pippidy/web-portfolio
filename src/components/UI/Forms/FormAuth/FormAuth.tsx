import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  doCreateWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from '../../../../firebase/auth';
import { TError } from '../../../../types/main';
import { catchFetchError, validateForm } from '../../../../utils/utils';
import InputBlock from '../../Inputs/InputBlock/InputBlock';
import ModalContext from '../../../../contexts/ModalContext';
import LoadingSimple from '../../LoadingSimple/LoadingSimple';
import { TAuthForm, TAuthValues } from '../../../../types/auth';
import { TInputElement } from '../../../../types/ui';

export default function FormAuth({ authType, setAuthType, modal }: TAuthForm) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<TError>();
  const [isSuccess, setIsSuccess] = useState(false);
  const isModalOpened = useContext(ModalContext);
  const [values, setValues] = useState<TAuthValues>({
    email: '',
    password: '',
  });

  // Resetting form when modal is opened/closed
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [isModalOpened]);

  // Clearing fetch errors on authType change
  useEffect(() => {
    setFetchError({ status: false });
  }, [authType]);

  const inputs: TInputElement[] = useMemo(
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
          <button
            onClick={() => modal.setIsOpened(false)}
            className="modal__button-default"
          >
            Ok
          </button>
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
                    value={values && values[input.attributes.name]}
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
          <button
            disabled={isLoading ? true : false}
            className="form-auth__button-submit modal__button-default"
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
          </button>

          {/* ERROR */}
          {fetchError && fetchError.status && (
            <p className="form-auth__error">{fetchError.message}</p>
          )}

          {/* ADDITIONAL INFO */}
          {authType === 'signUp' ? (
            <p className="form-auth__text">
              Already have an account?{' '}
              <button onClick={() => setAuthType('signIn')} type="button">
                Sign in
              </button>
            </p>
          ) : (
            authType === 'signIn' && (
              <p className="form-auth__text">
                Don't have an account?{' '}
                <button onClick={() => setAuthType('signUp')} type="button">
                  Sign up
                </button>
              </p>
            )
          )}
        </form>
      )}
    </>
  );
}
