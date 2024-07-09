import { User, onAuthStateChanged } from "firebase/auth";

import React, {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
} from "react";

import { useSegments, useRouter } from "expo-router";
import { auth } from "@/services/firebaseConfig";

interface AuthProps {
  user?: User | null;
  initialized: boolean;
}
export const AuthContext = createContext<AuthProps>({
  initialized: false,
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [initialized, setInitialized] = useState<boolean>(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialized(true);
    });
  }, []);

  const useProtectedRoute = () => {
    useEffect(() => {
      const protectedRoute = segments[0] !== "(auth)";

      if (!user && protectedRoute) {
        router.replace("/(auth)/signin");
      } else if (user && !protectedRoute) {
        router.replace("/(tabs)/home");
      }
    }, [user, segments]);
  };

  useProtectedRoute();

  const value = {
    user,
    initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
