import React, { Fragment, useContext, useEffect, useState } from 'react';
import Container from '../../Layout/Container/Container';
import Card from '../../Layout/Card/Card';
import Product from '../../Layout/Product/Product';
import Modal from '../../Layout/Modal/Modal';
import Button from '../../Layout/Button/Button';
import Message from '../../Layout/Message/Message';
import InputField from '../../Layout/InputField/InputField';
import { SearchBarContext } from '../../Store/SearchBar/SearchBarContext';
import Pagination from '../../Layout/Pagination/Pagination';

interface Pens {
  allPens: {
    _id: string;
    name: string;
    brand: string;
    color: string;
    amount: number;
    price: number;
  }[];
}

const buttonContainer = {
  display: 'flex',
  width: '50%',
  margin: '0 auto',
  justifyContent: 'space-evenly',
};

const PenPage: React.FC = () => {
  const [pens, setPens] = useState<Pens['allPens']>();
  const [opacity, setOpacity] = useState(0);
  const [penId, setPenId] = useState('');
  const [message, setMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [additionalAmount, setAdditionalAmount] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [productPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsPenPage, searchValue } = useContext(SearchBarContext);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const penArray = pens?.slice(indexOfFirstProduct, indexOfLastProduct);

  const changePageHandler = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setIsPenPage(true);
  }, [setIsPenPage]);

  const modalHandler = () => {
    opacity === 0 ? setOpacity(1) : setOpacity(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchPenList = await fetch('http://localhost:1337/api/pen/list', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      });
      return fetchPenList.json();
    };

    const response = fetchData();

    response.then((res: Pens) => {
      setPens(res.allPens);
      setNumberOfPages(Math.ceil(res.allPens.length / productPerPage));
    });
  }, [productPerPage]);

  const getPenId = (id: string, func: string) => {
    modalHandler();
    setPenId(id);
    if (func === 'delete') {
      setIsDeleting(true);
    } else if (func === 'add') {
      setIsDeleting(false);
    }
  };

  const addPen = (id: string) => {
    modalHandler();
    const response = async () => {
      const res = await fetch('http://localhost:1337/api/pen/add', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, additionalAmount }),
      });
      return res.json();
    };
    const res = response();

    res.then(({ allPens, status, message }) => {
      if (status === 'success') {
        setPens(allPens);
        setMessage(message);
        setIsDeleting(false);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    });
  };

  const deletePen = (id: string) => {
    modalHandler();
    const response = async () => {
      const res = await fetch('http://localhost:1337/api/pen/delete', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id }),
      });
      return res.json();
    };
    const res = response();

    res.then(({ status, allPens, message }) => {
      if (status === 'success') {
        setPens(allPens);
        setMessage(message);
        setIsDeleting(false);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    });
  };

  const getAdditionalAmount = (amount: string) => {
    setAdditionalAmount(parseInt(amount));
  };

  const addHandler = () => {
    if (additionalAmount < 1) {
      setModalMessage('You can not add less then one pen');
      setTimeout(() => {
        setModalMessage('');
      }, 3000);
    } else {
      addPen(penId);
    }
  };

  const deleteHandler = () => {
    deletePen(penId);
  };

  const pensFiltered = pens?.filter(
    (element) =>
      element.brand
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) ||
      element.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  return (
    <Fragment>
      <Container>
        {searchValue === ''
          ? penArray?.map(({ _id, name, amount, brand, color, price }) => (
              <Card key={_id} type='pen-page__card'>
                <Product
                  id={_id}
                  brand={brand}
                  color={color}
                  name={name}
                  price={price}
                  amount={amount}
                  getPenId={getPenId}
                />
              </Card>
            ))
          : pensFiltered?.map(({ _id, name, amount, brand, color, price }) => (
              <Card key={_id} type='pen-page__card'>
                <Product
                  id={_id}
                  brand={brand}
                  color={color}
                  name={name}
                  price={price}
                  amount={amount}
                  getPenId={getPenId}
                />
              </Card>
            ))}
        <Modal opacity={opacity}>
          {isDeleting ? (
            <div>
              <h2>Are you sure you want to delete this pen?</h2>
              <div style={buttonContainer}>
                <Button
                  text='Yes'
                  classType='btn-delete'
                  onClickHandler={deleteHandler}
                />
                <Button
                  text='No'
                  classType='btn'
                  onClickHandler={modalHandler}
                />
              </div>
            </div>
          ) : (
            <div>
              <h2>How many pens would you like to add?</h2>
              <Message text={modalMessage} type='modal__error' />
              <InputField
                getInputValue={getAdditionalAmount}
                label=''
                type='number'
              />
              <div style={buttonContainer}>
                <Button
                  text='Add'
                  classType='btn'
                  onClickHandler={addHandler}
                />
                <Button
                  text='Cancel'
                  classType='btn-delete'
                  onClickHandler={modalHandler}
                />
              </div>
            </div>
          )}
        </Modal>
      </Container>
      <Message text={message} type='success' />
      <Pagination pages={numberOfPages} changePageHandler={changePageHandler} />
    </Fragment>
  );
};

export default PenPage;
