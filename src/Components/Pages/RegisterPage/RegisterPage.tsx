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

const RegisterPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] =
    useState<MessageType['type']>('success');
  const { isLoggedIn } = useContext(UserContext);
  const { setIsPenPage } = useContext(SearchBarContext);
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn && navigate('/', { state: 'You are already logged in' });
  });

  useEffect(() => {
    setIsPenPage(false);
  }, [setIsPenPage]);

  const getLogin = (login: string) => {
    setLogin(login);
  };

  const getPassword = (password: string) => {
    setPassword(password);
  };

  const getPasswordCheck = (PasswordCheck: string) => {
    setPasswordCheck(PasswordCheck);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login.length < 6) {
      setMessage('Login has to be at least 6 characters long');
      setMessageType('warning');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else if (login === '' || password === '' || passwordCheck === '') {
      setMessage('All of the credentials are required');
      setMessageType('warning');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else if (password.length < 6) {
      setMessage('Password has to be at least 6 characters long');
      setMessageType('warning');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else if (password !== passwordCheck) {
      setMessage('Passwords do not match');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } else {
      const registerUser = async () => {
        const response = await fetch(
          'http://localhost:1337/api/user/register',
          {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
          }
        );
        return response.json();
      };
      const res = registerUser();
      res.then((res) => {
        if (res.status === 'error') {
          setMessage(res.message);
          setMessageType(res.status);
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          setMessage(res.message);
          setMessageType(res.status);
          setTimeout(() => {
            setMessage('');
          }, 5000);
        }
      });
    }
  };

  return (
    <div>
      <h1>If you want to register please provide your login and password</h1>
      <Card width='30%' type='card'>
        <Form onFormSubmit={submitForm}>
          <InputField getInputValue={getLogin} label='Login' type='text' />
          <InputField
            getInputValue={getPassword}
            label='Password'
            type='password'
          />
          <InputField
            getInputValue={getPasswordCheck}
            label='Repeat password'
            type='password'
          />
          <Button text='Submit' classType='btn' />
        </Form>
        <Message type={messageType} text={message} />
      </Card>
      <p>You agree to terms and conditions of use while creating new profile</p>
    </div>
  );
};

export default RegisterPage;
