import React from 'react';
import { Link } from 'react-router-dom';
import style from './StyledLink.module.css';

interface Props {
  to: string;
  text?: string;
  children?: React.ReactNode;
  onClickHandler?: () => void;
}

const StyledLink: React.FC<Props> = ({
  to,
  text,
  children,
  onClickHandler,
}) => {
  if (children !== undefined) {
    return (
      <div className={style['container']}>
        <Link className={style['link']} to={to}>
          {children}
        </Link>
      </div>
    );
  } else if (onClickHandler !== undefined) {
    return (
      <div onClick={onClickHandler} className={style['container']}>
        <Link className={style['link']} to={to}>
          {text}
        </Link>
        <hr className={style['underline']} />
      </div>
    );
  }
  return (
    <div className={style['container']}>
      <Link className={style['link']} to={to}>
        {text}
      </Link>
      <hr className={style['underline']} />
    </div>
  );
};

export default StyledLink;
