import { useState, createContext } from 'react';

const UserContext = createContext('');

export function UserProvider({ children }) {
  const [currentUserID, setCurrentUserID] = useState('');

  const setUserID = (userID) => {
    setCurrentUserID(userID);
  };

  return (
    <UserContext.Provider value={{ currentUserID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
