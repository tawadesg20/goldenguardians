import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext(undefined);

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return React.createElement(
    UserContext.Provider,
    { value: { user, setUser } },
    children
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
