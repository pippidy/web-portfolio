import { TComponentChildren } from './main';
import { User as TUserFirebase } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';

export type TAuthType = 'signUp' | 'signIn';
export type TUser = TUserFirebase | undefined | null;

export type TAuthFormProps = {
  authType: TAuthType;
  setAuthType: Dispatch<SetStateAction<TAuthType>>;
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
