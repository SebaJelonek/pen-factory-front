import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext';

interface Props {
  children: any;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = window.sessionStorage.getItem('userId');
    const admin = window.sessionStorage.getItem('isAdmin');
    const logged = window.sessionStorage.getItem('isLoggedIn');
    const login = window.sessionStorage.getItem('login');
    id !== null && setId(id);
    login !== null && setName(login);
    admin === 'true' && setIsAdmin(true);
    logged === 'true' && setIsLoggedIn(true);
  }, []);

  return (
    <UserContext.Provider
      value={{
        id,
        setId,
        name,
        setName,
        isAdmin,
        setIsAdmin,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
