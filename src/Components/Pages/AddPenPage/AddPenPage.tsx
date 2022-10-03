import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Layout/Button/Button';
import Card from '../../Layout/Card/Card';
import Form from '../../Layout/Form/Form';
import InputField from '../../Layout/InputField/InputField';
import Message from '../../Layout/Message/Message';
import { SearchBarContext } from '../../Store/SearchBar/SearchBarContext';
import { UserContext } from '../../Store/User/UserContext';

interface MessageType {
  type: 'error' | 'warning' | 'success';
}

const reg = /^\d+((\.|,)?\d{1,2})?$/;

const AddPenPage: React.FC = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [amountString, setAmountString] = useState('');
  const [priceString, setPriceString] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<MessageType['type']>('warning');
  const { setIsPenPage } = useContext(SearchBarContext);
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    !isAdmin && navigate('/', { state: 'Please log in as an admin' });
  });

  useEffect(() => {
    setIsPenPage(false);
  }, [setIsPenPage]);

  const getName = (name: string) => setName(name);
  const getBrand = (brand: string) => setBrand(brand);
  const getColor = (color: string) => setColor(color);
  const getAmount = (amount: string) => setAmountString(amount);
  const getPrice = (price: string) => setPriceString(price);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      name === '' ||
      brand === '' ||
      color === '' ||
      amountString === '' ||
      priceString === ''
    ) {
      setMessage('You need to fill all of the fields');
      setType('error');
      setTimeout(() => {
        setMessage('');
        setType('warning');
      }, 4000);
    } else if (!reg.test(priceString)) {
      setMessage('Price has to be a number');
      setType('warning');
      setTimeout(() => {
        setMessage('');
      }, 4000);
    } else {
      const amount = parseInt(amountString);
      let price: number;
      if (priceString.includes(',')) {
        const indexOfComma = priceString.indexOf(',');
        const priceArray = priceString.split('');
        priceArray.splice(indexOfComma, 1, '.');
        price = parseFloat(priceArray.join(''));
      } else {
        price = parseFloat(priceString);
      }

      const addPen = async () => {
        const response = await fetch('http://localhost:1337/api/pen/new', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pen: { name, brand, color, amount, price },
          }),
        });
        return response.json();
      };
      const response = addPen();

      response.then(({ message, status }) => {
        if (status === 'success') {
          setMessage(message);
          setType(status);
          setTimeout(() => {
            setMessage('');
            setType('warning');
          }, 3500);
        }
      });
    }
  };

  return (
    <div>
      <Card width='30%' type='card'>
        <Form onFormSubmit={submitForm}>
          <InputField getInputValue={getBrand} label='Brand' type='text' />
          <InputField getInputValue={getName} label='Name' type='text' />
          <InputField getInputValue={getColor} label='Color' type='text' />
          <InputField getInputValue={getAmount} label='Amount' type='number' />
          <InputField getInputValue={getPrice} label='Price' type='text' />
          <Button text='Add' classType='btn' />
        </Form>
        <Message type={type} text={message} />
      </Card>
    </div>
  );
};

export default AddPenPage;
