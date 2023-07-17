import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: '',
  access_token: '',
  expiry: '',
  IsAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [expiry, setExpiry] = useState('');
  const [access_token, setAccess_token] = useState('');


  function authenticate(token, expiry, access_token) {
    setAuthToken(token);
    setExpiry(expiry);
    setAccess_token(access_token);
    console.log("context", authToken, expiry, access_token);
  };

  function logout() {
    setAuthToken('');
    setExpiry('');
    setAccess_token('');
  };

  const value = {
    token: authToken,
    access_token: access_token,
    expiry: expiry,
    IsAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
