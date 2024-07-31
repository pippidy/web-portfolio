import { useNavigate } from 'react-router-dom';
import Section from '../../components/Section/Section';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import DataNotAvailable from '../../components/UI/DataNotAvailable/DataNotAvailable';
import ImageDummyAvatar from '../../components/ImageDummies/ImageDummyAvatar';
import Tabs from '../../components/UI/Tabs/Tabs';
import InfoItem from '../InfoPages/InfoItem/InfoItem';

// @ts-expect-error
import { ReactComponent as IconAvatar } from '../../assets/svg/avatar.svg';
import FormUpdate from './FormUpdate';

export default function Profile() {
  const auth = useAuth();
  const nav = useNavigate();

  // Redirect if not signed in
  useEffect(() => {
    !auth?.userSignedIn && nav('/auth-error');
  }, [auth?.userSignedIn, nav]);

  const [username, setUsername] = useState(
    auth?.currentUser ? auth?.currentUser.displayName : null
  );
  const [avatar, setAvatar] = useState(
    auth?.currentUser ? auth?.currentUser.photoURL : null
  );
  const [email] = useState(auth?.currentUser ? auth?.currentUser.email : null);

  return (
    <Section title="Profile" className="profile-page">
      <Tabs tabs={['Info', 'Settings']} title={username ? username : email}>
        {/* INFO TAB*/}
        <>
          {auth?.currentUser ? (
            <div className="info-page__content">
              {avatar ? (
                <div className="info-page__cover-holder card-flying card-flying_slide-right">
                  <img
                    className="info-page__cover-image"
                    src={avatar}
                    alt="Your profile avatar"
                  />
                </div>
              ) : (
                <div className="info-page__cover-holder info-page__cover-holder_no-image">
                  <ImageDummyAvatar />
                </div>
              )}

              <div className="info-page__data-holder">
                <ul className="info-page__data-list">
                  {username && (
                    <li>
                      <InfoItem name="Name">{username}</InfoItem>
                    </li>
                  )}

                  {email && (
                    <li>
                      <InfoItem name="Email">{email}</InfoItem>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <DataNotAvailable text="No info available" />
          )}
        </>

        <>
          <ul className="profile-menu">
            <li className="profile-menu__item">
              <FormUpdate setter={setUsername} type="username" />
            </li>

            <li className="profile-menu__item">
              <FormUpdate setter={setAvatar} type="avatar" />

              {avatar ? (
                <img
                  className="profile-menu__img"
                  src={avatar}
                  alt="Your profile avatar"
                />
              ) : (
                <div className="profile-menu__img">
                  <IconAvatar />
                </div>
              )}
            </li>
          </ul>
        </>
      </Tabs>
    </Section>
  );
}
