import React from 'react';
import cl from './Button.module.css';

export const Button = ({ link, text, style, onClick }) => {
  return (
    <div className={cl.button} style={style} onClick={onClick}>
      {text || 'Подробнее →'}
    </div>
  );
};
