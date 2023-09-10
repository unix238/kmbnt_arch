import React from 'react';
import cl from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={cl.center}>
      <div className={cl.lds_dual_ring}></div>
    </div>
  );
};
