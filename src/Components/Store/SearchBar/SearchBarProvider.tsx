import React, { useState } from 'react';
import { SearchBarContext } from './SearchBarContext';

interface Props {
  children: any;
}

const SearchBarProvider: React.FC<Props> = ({ children }) => {
  const [isPenPage, setIsPenPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [productAmount, setProductAmount] = useState(0);

  return (
    <SearchBarContext.Provider
      value={{
        isPenPage,
        setIsPenPage,
        searchValue,
        setSearchValue,
        productAmount,
        setProductAmount,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};

export default SearchBarProvider;
