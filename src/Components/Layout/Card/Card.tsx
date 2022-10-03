import React from 'react';
import style from './Card.module.css';

interface Props {
  type: 'card' | 'pen-page__card';
  children: React.ReactNode;
  width?: string;
}

const Card: React.FC<Props> = ({ children, width, type }) => {
  return (
    <div style={{ width }} className={style[type]}>
      {children}
    </div>
  );
};

export default Card;
