import React from 'react';

interface context {
  types: {
    isPenPage: boolean;
    setIsPenPage: React.Dispatch<React.SetStateAction<boolean>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    productAmount: number;
    setProductAmount: React.Dispatch<React.SetStateAction<number>>;
  };
}

export const SearchBarContext = React.createContext<context['types']>({
  isPenPage: false,
  setIsPenPage: () => {},
  searchValue: '',
  setSearchValue: () => {},
  productAmount: 0,
  setProductAmount: () => {},
});
