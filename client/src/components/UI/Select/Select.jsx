import React from 'react';
import cl from './Select.module.css';

export const Select = ({ children, style, onChange }) => {
  return (
    <select style={style} className={cl.select} onChange={onChange}>
      {children}
    </select>
  );
};
