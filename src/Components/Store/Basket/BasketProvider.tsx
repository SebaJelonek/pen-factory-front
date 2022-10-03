import React, { useEffect, useState } from 'react';
import { BasketContext } from './BasketContext';

interface Props {
  children: any;
}

const BasketProvider: React.FC<Props> = ({ children }) => {
  const [productList, setProductList] = useState();
  const [idList, setIdList] = useState();

  useEffect(() => {}, [productList]);

  return (
    <BasketContext.Provider
      value={{
        productList,
        setProductList,
        idList,
        setIdList,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
