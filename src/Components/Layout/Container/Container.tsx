import React from 'react';
import style from './Container.module.css';

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return <div className={style['container']}>{children}</div>;
};

export default Container;
