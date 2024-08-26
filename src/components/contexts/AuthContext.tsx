import { type TAuthContext, type TUser } from '../../types/auth';
import {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const AuthContext = createContext<TAuthContext>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<TUser>(null);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  async function initializeUser(user: TUser) {
    if (user) {
      setCurrentUser({ ...user });
      setUserSignedIn(true);
    } else {
      setCurrentUser(null);
      setUserSignedIn(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      initializeUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userSignedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
