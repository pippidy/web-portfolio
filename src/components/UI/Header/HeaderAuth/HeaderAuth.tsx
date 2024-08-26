import { type TAuthType } from '../../../../types/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import DefaultModalBlock from '../../Modal/DefaultModalBlock/DefaultModalBlock';
import { useAuth } from '../../../contexts/AuthContext';
import ButtonSignOut from '../../Buttons/ButtonSignOut/ButtonSignOut';
import ButtonDefault from '../../Buttons/ButtonDefault/ButtonDefault';
import FormAuth from '../../Forms/FormAuth/FormAuth';
import cn from 'classnames';

// @ts-expect-error
import { ReactComponent as PersonIcon } from '../../../../assets/svg/person.svg';

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
                  <ButtonSignOut className="header-auth__menu-item">
                    Sign out
                  </ButtonSignOut>
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
                <ButtonDefault
                  className="header-auth__content-button"
                  onClick={() => {
                    setAuthType('signUp');
                    setIsAuthModalOpened(true);
                  }}
                >
                  Sign Up
                </ButtonDefault>{' '}
                or{' '}
                <ButtonDefault
                  className="header-auth__content-button"
                  onClick={() => {
                    setAuthType('signIn');
                    setIsAuthModalOpened(true);
                  }}
                >
                  Sign In
                </ButtonDefault>
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
