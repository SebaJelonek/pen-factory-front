import React from 'react';

interface context {
  types: {
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const UserContext = React.createContext<context['types']>({
  id: '',
  setId: () => {},
  name: '',
  setName: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
