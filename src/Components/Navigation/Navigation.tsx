import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Layout/Navbar/Navbar';
//----- STORE --------//
import BasketProvider from '../Store/Basket/BasketProvider';
import SearchBarProvider from '../Store/SearchBar/SearchBarProvider';
//----- PAGES --------//
import IndexPage from '../Pages/IndexPage/IndexPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import PenPage from '../Pages/PenPage/PenPage';
import AddPenPage from '../Pages/AddPenPage/AddPenPage';
import BasketPage from '../Pages/BasketPage/BasketPage';
import OrderPage from '../Pages/OrderPage/OrderPage';
import UserProvider from '../Store/User/UserProvider';

const Navigation: React.FC = () => {
  return (
    <UserProvider>
      <BasketProvider>
        <SearchBarProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<IndexPage />} />
              <Route path='/pen' element={<PenPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/add-pen' element={<AddPenPage />} />
              <Route path='/cart' element={<BasketPage />} />
              <Route path='/order' element={<OrderPage />} />
            </Routes>
          </Router>
        </SearchBarProvider>
      </BasketProvider>
    </UserProvider>
  );
};

export default Navigation;
