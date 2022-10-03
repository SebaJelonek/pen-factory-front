import React, { Fragment, useContext, useEffect } from 'react';
import { SearchBarContext } from '../../Store/SearchBar/SearchBarContext';
import { UserContext } from '../../Store/User/UserContext';
import InputField from '../InputField/InputField';
import StyledLink from '../StyledLink/StyledLink';
import style from './Navbar.module.css';

const cartIcon = (
  <svg
    className={style['icon']}
    xmlns='http://www.w3.org/2000/svg'
    height='40'
    width='40'
  >
    <path d='M11.875 36.625q-1.292 0-2.208-.917-.917-.916-.917-2.166 0-1.292.917-2.209.916-.916 2.208-.916 1.292 0 2.187.916.896.917.896 2.209 0 1.291-.916 2.187-.917.896-2.167.896Zm16.667 0q-1.292 0-2.209-.917-.916-.916-.916-2.166 0-1.292.916-2.209.917-.916 2.209-.916 1.291 0 2.187.916.896.917.896 2.209 0 1.291-.917 2.187-.916.896-2.166.896ZM9.958 9.417l4.375 9.125h11.875l5-9.125ZM8.583 6.625h24.542q.958 0 1.458.875t.042 1.75l-5.75 10.292q-.458.833-1.187 1.291-.73.459-1.646.459H13.5l-2.167 4h20.292v2.791H11.583q-1.791 0-2.625-1.333-.833-1.333 0-2.833l2.5-4.625L5.25 6.125H1.958V3.333h5.084Zm5.75 11.917h11.875Z' />
  </svg>
);

const penIcon = (
  <svg
    className={style['icon']}
    xmlns='http://www.w3.org/2000/svg'
    height='40'
    width='40'
  >
    <path d='M23.333 35q-.583 0-.979-.417-.396-.416-.396-.958 0-.625.396-1.021.396-.396.979-.396 2.292 0 3.917-.916 1.625-.917 1.625-2.125 0-.834-1-1.605-1-.77-2.708-1.27l2.125-2.125q2.208.791 3.291 2.083 1.084 1.292 1.084 2.917 0 2.791-2.563 4.312Q26.542 35 23.333 35ZM9.208 22.583q-2.166-.625-3.187-1.771Q5 19.667 5 18.333q0-1.541 1.146-2.729Q7.292 14.417 11.042 13q2.708-1.083 3.479-1.646.771-.562.771-1.312 0-.917-.896-1.584-.896-.666-2.729-.666-1.084 0-1.855.271-.77.27-1.395.895-.375.375-.938.438-.562.062-1.021-.313-.5-.375-.541-.916-.042-.542.333-1Q7 6.25 8.438 5.625 9.875 5 11.667 5q2.875 0 4.625 1.354t1.75 3.688q0 1.666-1.188 2.896-1.187 1.229-4.729 2.604-2.667 1.041-3.5 1.604-.833.562-.833 1.187 0 .584.896 1.105.895.52 2.687.979Zm21.709-5.916L25 10.75l1.833-1.833q.834-.834 1.917-.834 1.083 0 1.875.834l2.125 2.125q.833.791.833 1.875 0 1.083-.833 1.916ZM9.458 32.208h1.917l13.583-13.583-1.916-1.917L9.458 30.292ZM6.667 35v-5.917l16.375-16.375 5.916 5.917L12.583 35Zm16.375-18.292 1.916 1.917Z' />
  </svg>
);

const Navbar: React.FC = () => {
  const { isPenPage, setSearchValue, productAmount } =
    useContext(SearchBarContext);
  const { isLoggedIn, isAdmin, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {}, [productAmount]);

  const getSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    window.sessionStorage.removeItem('login');
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('isAdmin');
    window.sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <nav className={style['navbar']}>
      <ul className={style['link-list']}>
        <li>
          <StyledLink to='/'>{penIcon}</StyledLink>
        </li>
        {!isLoggedIn ? (
          <Fragment>
            <li>
              <StyledLink text='Login' to='/login' />
            </li>
            <li>
              <StyledLink text='Register' to='/register' />
            </li>
          </Fragment>
        ) : (
          <li>
            <StyledLink onClickHandler={logOut} text='Logout' to='/' />
          </li>
        )}
        <li>
          <StyledLink text='Pens' to='/pen' />
        </li>
        {isAdmin && (
          <li>
            <StyledLink text='Add Pen' to='/add-pen' />
          </li>
        )}
        {isLoggedIn && (
          <li>
            <StyledLink text='My orders' to='order' />
          </li>
        )}
        {isPenPage && (
          <li>
            <InputField
              getInputValue={getSearchValue}
              label=''
              type='search-field'
            />
          </li>
        )}
        {isLoggedIn ? (
          <li style={isPenPage ? { left: '51.5%' } : { left: '65.1%' }}>
            <StyledLink to='/cart'>
              {cartIcon}
              {productAmount > 0 && (
                <div className={style['badge']}>{productAmount}</div>
              )}
            </StyledLink>
          </li>
        ) : (
          <li></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
