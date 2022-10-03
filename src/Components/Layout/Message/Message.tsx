import React, { useEffect, useState } from 'react';
import style from './Message.module.css';

interface Props {
  text: string;
  type: 'warning' | 'success' | 'error' | 'modal__error';
}

const Message: React.FC<Props> = ({ text, type }) => {
  const [message, setMessage] = useState(text);

  useEffect(() => {
    setMessage(text);
  }, [text]);

  if (type === 'modal__error') {
    return (
      <h3
        style={message === '' ? { opacity: 0 } : { opacity: 1 }}
        className={style[`message-${type}`]}
      >
        {message}
      </h3>
    );
  }

  return (
    <h2
      style={message === '' ? { height: 0 } : { height: '32px' }}
      className={style[`message-${type}`]}
    >
      {message}
    </h2>
  );
};

export default Message;
