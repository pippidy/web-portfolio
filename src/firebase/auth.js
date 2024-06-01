import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';

export async function doCreateWithEmailAndPassword(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function doSignInWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function doSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  return result;
}

export async function doSignOut() {
  return auth.signOut();
}
