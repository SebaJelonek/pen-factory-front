import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchBarContext } from '../../Store/SearchBar/SearchBarContext';
import { UserContext } from '../../Store/User/UserContext';
import Message from '../../Layout/Message/Message';

const IndexPage: React.FC = () => {
  const { setIsPenPage } = useContext(SearchBarContext);
  const { isLoggedIn, name } = useContext(UserContext);
  const { state } = useLocation();

  useEffect(() => {
    setIsPenPage(false);
  }, [setIsPenPage]);

  return (
    <div>
      <h1>Hi!</h1>
      {isLoggedIn && <h2>{name} nice to see you again</h2>}
      {state !== null && <Message text={state} type='error' />}
    </div>
  );
};

export default IndexPage;
