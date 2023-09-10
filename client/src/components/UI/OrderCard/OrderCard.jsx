import React from 'react';
import cl from './OrderCard.module.css';
import config from '../../../utils/config';

export const OrderCard = ({ item }) => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <div className={cl.orderCardImage}>
          <img className={cl.img} src={config.upload + item.images[0]} alt='' />
        </div>
        <div className={cl.orderCardTexts}>
          <div className={cl.title}>{item.title}</div>
          <div className={cl.size}>Размер: {item.size}</div>
        </div>
      </div>
      <div className={cl.price}>{item.price} ₸</div>
    </div>
  );
};
