import React from 'react';
import style from './Form.module.css';

interface Props {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form: React.FC<Props> = ({ children, onFormSubmit }) => {
  return (
    <form className={style['flex']} onSubmit={onFormSubmit}>
      <div className={style['container']}>{children}</div>
    </form>
  );
};

export default Form;
