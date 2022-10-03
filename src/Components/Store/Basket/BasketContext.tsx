import React from 'react';

interface context {
  types: {
    idList: string[] | undefined;
    setIdList: any;
    productList:
      | {
          productId: string;
          productName: string;
          productBrand: string;
          productAmount: number;
          maxProductAmount: number;
          productPrice: number;
        }[]
      | undefined;
    setProductList: any;
  };
}

export const BasketContext = React.createContext<context['types']>({
  idList: [''],
  setIdList: () => {},
  productList: [
    {
      productId: '',
      productName: '',
      productBrand: '',
      productAmount: 0,
      maxProductAmount: 0,
      productPrice: 0,
    },
  ],
  setProductList: () => {},
});
