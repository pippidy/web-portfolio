import { TComponentChildren } from './main';
import { User as TUserFirebase } from 'firebase/auth';

export type TAuthType = 'signUp' | 'signIn';
export type TUser = TUserFirebase | undefined | null;

export type TProtectedRoute = {
  children: TComponentChildren<React.ReactNode>;
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
