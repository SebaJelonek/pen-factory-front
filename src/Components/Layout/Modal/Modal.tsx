import React from 'react';
import style from './Modal.module.css';

interface Props {
  opacity: number;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ opacity, children }) => {
  return (
    <div
      style={{ opacity: opacity, zIndex: opacity - 1 }}
      className={style['modal']}
    >
      <div className={style['modal-container']}>{children}</div>
    </div>
  );
};

export default Modal;
