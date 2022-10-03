import React, { useContext, useEffect, useState } from 'react';
import { BasketContext } from '../../Store/Basket/BasketContext';
import { SearchBarContext } from '../../Store/SearchBar/SearchBarContext';
import Button from '../Button/Button';
import Card from '../Card/Card';
import style from './BasketContainer.module.css';

interface Props {
  productBrand: string;
  productId: string;
  productName: string;
  productPrice: number;
  productAmount: number;
  maxProductAmount: number;
  updateProductList: (productAmount: number, productId: string) => void;
  updatePrice: () => void;
}

const BasketContainer: React.FC<Props> = ({
  productBrand,
  productId,
  productName,
  productPrice,
  maxProductAmount,
  updateProductList,
  updatePrice,
}) => {
  const [currentProductAmount, setCurrentProductAmount] = useState(1);
  const { idList, setIdList, productList, setProductList } =
    useContext(BasketContext);

  const { productAmount, setProductAmount } = useContext(SearchBarContext);

  useEffect(() => {
    updateProductList(currentProductAmount, productId);
    updatePrice();
  }, [
    currentProductAmount,
    productId,
    updateProductList,
    updatePrice,
    idList,
    setIdList,
    productList,
    setProductList,
  ]);

  const addProductAmount = () => {
    if (currentProductAmount + 1 > maxProductAmount) {
      console.log('no');
    } else {
      setCurrentProductAmount(currentProductAmount + 1);
    }
  };

  const subtractProductAmount = () => {
    if (currentProductAmount === 1) {
      console.log('no');
    } else {
      setCurrentProductAmount(currentProductAmount - 1);
    }
  };

  const deleteFromBasket = () => {
    const newIdList = idList?.filter((id) => id !== productId);
    const newProductList = productList?.filter(
      (product) => product.productId !== productId
    );
    setIdList(newIdList);
    setProductList(newProductList);
    setProductAmount(productAmount - 1);
  };

  return (
    <Card width='30%' type='card'>
      <div className={style['flex']}>
        <h2>Product:&nbsp;</h2>
        <h2>
          {productBrand} {productName}
        </h2>
      </div>
      <div className={style['flex']}>
        <h2>Amount:&nbsp;</h2>
        <Button
          classType='btn'
          text='-'
          onClickHandler={subtractProductAmount}
        />
        <h2>{currentProductAmount}</h2>
        <Button classType='btn' text='+' onClickHandler={addProductAmount} />
      </div>
      <div>
        Current price:{' '}
        {Math.round(productPrice * currentProductAmount * 100) / 100}
      </div>
      <Button
        text='Delete from basket'
        classType='btn-delete'
        onClickHandler={deleteFromBasket}
      />
    </Card>
  );
};

export default BasketContainer;
