import { TComponentChildren } from './main';
import { User as TUserFirebase } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { TModalControl } from './modal';

export type TAuthType = 'signUp' | 'signIn';
export type TUser = TUserFirebase | undefined | null;

export type TAuthFormProps = {
  authType: TAuthType;
  setAuthType: Dispatch<SetStateAction<TAuthType>>;
  modal: TModalControl;
};

export type TProtectedRoute = {
  children: TComponentChildren;
  user: TUser;
};

export type TAuthContext = {
  currentUser: TUser;
  userSignedIn: boolean;
  loading: boolean;
} | null;

export type TAuthValues = {
  [key: string]: string | undefined; // index signature
  email: string;
  password: string;
};

export type TSignOutButtonProps = {
  children: TComponentChildren;
  className?: string;
};
