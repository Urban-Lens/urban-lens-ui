import storage from "@/lib/storage";
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
  logout: () => void;
  setToken: (token: string) => void;
}

interface Props {
  children: React.ReactNode;
}

/**  Context for authentication data and services, with an undefined default value. */
const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [token, setTokenState] = useState(storage.getToken());

  const isAuthenticated = token ? true : false;

  const setToken = (newToken: string) => {
    storage.setToken(newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    storage.removeToken();
    setTokenState("");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider. Make sure you are rendering it inside the context of AuthProvider."
    );
  }
  return context;
}
