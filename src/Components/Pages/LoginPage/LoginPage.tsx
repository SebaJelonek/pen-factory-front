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
  type: 'error' | 'success' | 'warning';
}

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] =
    useState<MessageType['type']>('success');
  const navigate = useNavigate();
  const { setIsPenPage } = useContext(SearchBarContext);
  const { isLoggedIn, setIsLoggedIn, setIsAdmin, setId, setName } =
    useContext(UserContext);

  useEffect(() => {
    isLoggedIn && navigate('/', { state: 'You are already logged in' });
  });

  useEffect(() => {
    setIsPenPage(false);
  }, [setIsPenPage]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const loginUser = async () => {
      const response = await fetch(
        'https://pen-factory.onrender.com/api/user/login',
        {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login, password }),
        }
      );
      return response.json();
    };

    const res = loginUser();

    res.then(({ status, message, userId, isAdmin, login }) => {
      if (status === 'error') {
        setMessage(message);
        setMessageType(status);
        setPassword('');
        setLogin('');
        setTimeout(() => {
          setMessage('');
        }, 2500);
      } else {
        setMessage(message);
        setIsLoggedIn(true);
        setId(userId);
        setName(login);
        setIsAdmin(isAdmin);
        window.sessionStorage.setItem('login', `${login}`);
        window.sessionStorage.setItem('userId', `${userId}`);
        window.sessionStorage.setItem('isAdmin', `${isAdmin}`);
        window.sessionStorage.setItem('isLoggedIn', 'true');
        navigate('/pen');
        setTimeout(() => {
          setMessage('');
        }, 500);
      }
    });
  };

  const getLogin = (login: string) => {
    setLogin(login);
  };

  const getPassword = (password: string) => {
    setPassword(password);
  };

  return (
    <div>
      <Card width='30%' type='card'>
        <Form onFormSubmit={submitForm}>
          <InputField getInputValue={getLogin} label='Login' type='text' />
          <InputField
            getInputValue={getPassword}
            label='Password'
            type='password'
          />
          <Button text='Submit' classType='btn' />
        </Form>
        <Message text={message} type={messageType} />
      </Card>
    </div>
  );
};

export default LoginPage;
