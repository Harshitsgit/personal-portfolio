import { createContext, useContext, useState } from "react";

const initialState = {
  user: null,
  status: false,
  signIn: () => {},
  signOut: () => {},
};

type AuthContextType = {
  user: { $id: string } | null;
  status: boolean;
  signIn: (userData: { $id: string }) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<{ $id: string } | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  const signIn = (user: { $id: string }) => {
    setUser(user);
    setStatus(true);
  };

  const signOut = () => {
    setUser(null);
    setStatus(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
