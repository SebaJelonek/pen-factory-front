import React, { useContext, useEffect, useState } from 'react';
import { SearchBarContext } from '../../Store/SearchBar/SearchBarContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Store/User/UserContext';
interface FetchedData {
  order: {
    _id: string;
    productNameList: string[];
    productBrandList: string[];
    totalValue: number;
  }[];
}

const OrderPage: React.FC = () => {
  const { setIsPenPage } = useContext(SearchBarContext);
  const { id, isLoggedIn } = useContext(UserContext);
  const [userOrder, setUserOrder] = useState<FetchedData['order']>();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn &&
      navigate('/', { state: 'Please log in or create account first' });
  });

  useEffect(() => {
    setIsPenPage(false);
  }, [setIsPenPage]);

  useEffect(() => {
    const orderList = () => {
      const res = async () => {
        const response = await fetch('https://pen-factory.onrender.com/api/order/list', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        return response.json();
      };

      const response = res();

      response.then(({ userOrders, status, message }) => {
        if (status === 'success') {
          setMessage(message);
          setUserOrder(userOrders);
        }
      });
    };
    orderList();
  }, [setUserOrder, id]);

  return (
    <div>
      {userOrder !== undefined ? (
        <h2>Your orders are in here!</h2>
      ) : (
        <h2>
          Once you make your first order it is going to be visible in here
        </h2>
      )}
      {message !== '' && <h3>{message}</h3>}
      {userOrder !== undefined &&
        userOrder.map(
          ({ _id, productBrandList, productNameList, totalValue }) => (
            <div key={_id}>
              <div>{totalValue}</div>
              <div>
                {productNameList.map((name) => (
                  <div key={_id + Math.random()}>{name}</div>
                ))}
              </div>
              <div>
                {productBrandList.map((brand) => (
                  <div key={_id + Math.random()}>{brand}</div>
                ))}
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default OrderPage;
