import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
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

export async function doUpdateProfile({ userName, userAvatar }) {
  return updateProfile(auth.currentUser, {
    displayName: userName,
    photoURL: userAvatar,
  });
}
