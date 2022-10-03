import React, { Fragment, useContext } from 'react';
import { BasketContext } from '../../Store/Basket/BasketContext';
import { SearchBarContext } from '../../Store/SearchBar/SearchBarContext';
import { UserContext } from '../../Store/User/UserContext';
import Button from '../Button/Button';
import style from './Product.module.css';

interface Props {
  id: string;
  brand: string;
  name: string;
  color: string;
  amount: number;
  price: number;
  getPenId: (id: string, func: string) => void;
}

const Product: React.FC<Props> = ({
  id,
  brand,
  name,
  color,
  amount,
  price,
  getPenId,
}) => {
  const { productList, setProductList, idList, setIdList } =
    useContext(BasketContext);
  const { setProductAmount } = useContext(SearchBarContext);
  const { isAdmin, isLoggedIn } = useContext(UserContext);
  let amountColor;
  if (amount < 10) amountColor = 'red';
  if (amount > 10) amountColor = 'orangered';
  if (amount > 20) amountColor = 'green';

  const addToBasket = () => {
    if (productList === undefined) {
      setProductAmount(1);
      setProductList([
        {
          productId: id,
          productName: name,
          productBrand: brand,
          productAmount: 1,
          maxProductAmount: amount,
          productPrice: price,
        },
      ]);
      setIdList([id]);
    } else {
      let newProductList = productList;
      let newIdList = idList;
      if (!idList?.includes(id)) {
        newProductList.push({
          productId: id,
          productName: name,
          productBrand: brand,
          productAmount: 1,
          maxProductAmount: amount,
          productPrice: price,
        });
        newIdList?.push(id);
        setProductList(newProductList);
        setIdList(newIdList);
        setProductAmount(newProductList.length);
      }
    }
  };

  const deletePen = () => {
    getPenId(id, 'delete');
  };

  const addPen = () => {
    getPenId(id, 'add');
  };

  const productInfo =
    isLoggedIn && idList !== undefined && idList.includes(id) ? (
      <h3 className={style['product-info']}>Product already in basket</h3>
    ) : amount === 0 ? (
      <h3 className={style['product-out']}>Product is out of stock</h3>
    ) : (
      isLoggedIn && (
        <Button
          classType='btn-buy'
          text='Add to basket'
          onClickHandler={addToBasket}
        />
      )
    );

  return (
    <Fragment>
      <div className={style['product-container']}>
        <div className={style['product-flex']}>
          <ul className={style['product-list']}>
            <li>
              <h2>Brand:</h2>
            </li>
            <li>
              <h3>Name:</h3>
            </li>
            <li>
              <h3>Price:</h3>
            </li>
            <li>
              <h3>Color:</h3>
            </li>
            {amount > 1 && (
              <li>
                <h3 style={{ color: amountColor }}>On Stock:</h3>
              </li>
            )}
          </ul>
          <ul className={style['product-list']}>
            <li>
              <h2>{brand}</h2>
            </li>
            <li>
              <h3>{name}</h3>
            </li>
            <li>
              <h3>{price}</h3>
            </li>
            <li>
              <h3 style={{ color: color }}>{color}</h3>
            </li>
            <li>{amount > 1 && <h3>{amount}</h3>}</li>
          </ul>
        </div>
      </div>
      {productInfo}
      {isAdmin && (
        <div className={style['container__admin-buttons']}>
          <Button
            classType='btn-delete'
            text='Delete'
            onClickHandler={deletePen}
          />
          <Button classType='btn' text='Add new' onClickHandler={addPen} />
        </div>
      )}
    </Fragment>
  );
};

export default Product;
