import React, { Fragment, useEffect, useState } from 'react';
import style from './InputField.module.css';

interface Props {
  type: 'text' | 'password' | 'number' | 'search-field';
  label?: string;
  getInputValue: (value: string) => void;
}

const searchIcon = (
  <svg
    className={style['search-icon']}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
  >
    <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z' />
  </svg>
);

const InputField: React.FC<Props> = ({ type, label, getInputValue }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    getInputValue(input);
  }, [getInputValue, input]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  if (type === 'search-field') {
    return (
      <Fragment>
        <input
          className={style['search-field']}
          type={type}
          name={label}
          id={label}
          value={input}
          onChange={onChangeHandler}
        />
        {searchIcon}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <input
        className={style['input-field']}
        type={type}
        name={label}
        id={label}
        value={input}
        onChange={onChangeHandler}
      />
      <label
        className={input !== '' ? style['label-off'] : style['label']}
        htmlFor={label}
      >
        {label}
      </label>
    </Fragment>
  );
};

export default InputField;
