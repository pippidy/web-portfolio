import { type TAuthType } from '../../../types/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../UI/Modal/Modal';
import FormAuth from '../../UI/Forms/FormAuth/FormAuth';
import DefaultModalBlock from '../../UI/Modal/DefaultModalBlock/DefaultModalBlock';
import { useAuth } from '../../../contexts/AuthContext';
import SignOutButton from '../../SignOutButton/SignOutButton';
import Button from '../../UI/Buttons/Button/Button';
import cn from 'classnames';

// @ts-expect-error
import { ReactComponent as PersonIcon } from '../../../assets/svg/person.svg';

export default function HeaderAuth() {
  const auth = useAuth();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [authType, setAuthType] = useState<TAuthType>('signIn');

  const mainClass = cn('header-auth', {
    'header-auth_error': !auth?.userSignedIn,
  });

  return (
    <>
      <div className={mainClass}>
        <div className="icon-auth">
          <PersonIcon className="icon-auth__svg" width="25px" height="25px" />
        </div>

        <div className="header-auth__content">
          <div className="header-auth__content-header">Profile</div>
          {auth?.userSignedIn ? (
            <nav>
              <ul className="header-auth__menu">
                <li>
                  <Link className="header-auth__menu-item" to="/profile">
                    Profile page
                  </Link>
                </li>

                <li>
                  <SignOutButton className="header-auth__menu-item">
                    Sign out
                  </SignOutButton>
                </li>
              </ul>
            </nav>
          ) : (
            <>
              <p className="header-auth__content-title">
                You're not authorized!
              </p>

              <p>
                Please{' '}
                <Button
                  className="header-auth__content-button"
                  onClick={() => {
                    setAuthType('signUp');
                    setIsAuthModalOpened(true);
                  }}
                >
                  Sign Up
                </Button>{' '}
                or{' '}
                <Button
                  className="header-auth__content-button"
                  onClick={() => {
                    setAuthType('signIn');
                    setIsAuthModalOpened(true);
                  }}
                >
                  Sign In
                </Button>
              </p>
            </>
          )}
        </div>
      </div>

      {(!auth?.userSignedIn || isAuthModalOpened) && (
        <Modal isOpened={isAuthModalOpened} setIsOpened={setIsAuthModalOpened}>
          <DefaultModalBlock>
            <FormAuth authType={authType} setAuthType={setAuthType} />
          </DefaultModalBlock>
        </Modal>
      )}
    </>
  );
}
