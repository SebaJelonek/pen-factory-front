import React from 'react';
import style from './Button.module.css';

interface Props {
  text: string;
  classType: 'btn' | 'btn-delete' | 'btn-buy' | 'btn-finalize';
  onClickHandler?: any;
}

const Button: React.FC<Props> = ({ text, classType, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className={style[`${classType}`]}>
      {text}
    </button>
  );
};

export default Button;
