import React, { Fragment, useContext, useEffect, useState } from 'react';
import BasketContainer from '../../Layout/BasketContainer/BasketContainer';
import Button from '../../Layout/Button/Button';
import Message from '../../Layout/Message/Message';
import { BasketContext } from '../../Store/Basket/BasketContext';
import { SearchBarContext } from '../../Store/SearchBar/SearchBarContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Store/User/UserContext';

const BasketPage: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');
  const { productList, setProductList, setIdList } = useContext(BasketContext);
  const { setIsPenPage, setProductAmount } = useContext(SearchBarContext);
  const { isLoggedIn, id } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn &&
      navigate('/', { state: 'Please log in or create account first' });
  });

  useEffect(() => {
    setIsPenPage(false);
  }, [setIsPenPage]);

  useEffect(() => {
    setProductList(productList);
  }, [productList, setProductList]);

  const updateProductList = (
    currentProductAmount: number,
    productId: string
  ) => {
    productList?.filter(
      (product) =>
        product.productId === productId &&
        (product.productAmount = currentProductAmount)
    );
  };

  const updatePrice = () => {
    if (productList !== undefined) {
      let priceArray = [];
      for (let index = 0; index < productList.length; index++) {
        const { productAmount, productPrice } = productList[index];
        priceArray.push(productAmount * productPrice);
      }
      let fullPrice = 0;
      for (let index = 0; index < priceArray.length; index++) {
        const price = priceArray[index];
        fullPrice += price;
      }
      setPrice(Math.round(fullPrice * 100) / 100);
    }
  };

  const buyRequest = () => {
    console.log(productList);
    const response = async () => {
      const res = await fetch(
        'https://pen-factory.onrender.com/api/order/new',
        {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productList, id, totalValue: price }),
        }
      );
      return res.json();
    };
    const res = response();

    res.then(({ message, orderId, status }) => {
      setProductList(undefined);
      setIdList(undefined);
      setProductAmount(0);
      if (status === 'success') {
        setMessage(`${message}${'\n'}ID of your order is ${orderId}`);
      } else {
        setMessage(message);
      }
      setTimeout(() => {
        setMessage('');
      }, 5000);
    });
  };

  return (
    <Fragment>
      {productList?.map(
        ({
          productAmount,
          maxProductAmount,
          productBrand,
          productId,
          productName,
          productPrice,
        }) => (
          <BasketContainer
            key={productId}
            productId={productId}
            productBrand={productBrand}
            productName={productName}
            productAmount={productAmount}
            maxProductAmount={maxProductAmount}
            productPrice={productPrice}
            updateProductList={updateProductList}
            updatePrice={updatePrice}
          />
        )
      )}
      {productList !== undefined && productList?.length > 0 ? (
        <Fragment>
          <h2>Full Price: {price}</h2>
          <Button
            text='Buy now'
            classType='btn-finalize'
            onClickHandler={buyRequest}
          />
        </Fragment>
      ) : message !== '' ? (
        <Message text={message} type='success' />
      ) : (
        <h2>Basket is empty</h2>
      )}
    </Fragment>
  );
};

export default BasketPage;
