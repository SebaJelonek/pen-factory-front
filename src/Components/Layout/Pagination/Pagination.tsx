import React from 'react';
import style from './Pagination.module.css';

interface Props {
  pages: number;
  changePageHandler: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ pages, changePageHandler }) => {
  let array = [];

  for (let index = 0; index < pages; index++) {
    array.push(index + 1);
  }

  const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    changePageHandler(parseInt(e.currentTarget.innerText));
  };

  return (
    <div>
      <ul className={style['page-list']}>
        {array.map((page) => (
          <li className={style['page']} onClick={clickHandler} key={page}>
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
