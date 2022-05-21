import { useState, createContext } from 'react';

const AuthContext = createContext('');

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState('');

  const setUserAccessToken = (userAccessToken) => {
    setAccessToken(userAccessToken);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setUserAccessToken}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
