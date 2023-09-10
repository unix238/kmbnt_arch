import React from 'react';

import left from '../../../img/left.png';
import right1 from '../../../img/right1.png';
import right2 from '../../../img/right2.png';
import right3 from '../../../img/right3.png';
import right4 from '../../../img/right4.png';

import cl from './SpecialOffer.module.css';

export const SpecialOffer = () => {
  return (
    <div className={cl.special__offer__section}>
      <div className={cl.special__offer__title}>В наличии новый кастом!</div>
      <div className={cl.special__offer__subtitle}>
        Элементы ручной вышивки, оттиска, росписи. Каждая модель имеет свой
        яркий особенный элемент.
      </div>
      <div className={cl.special__offer__buy}>Купить со скидкой 50% →</div>
      <div className={cl.special__offer__items}>
        <div className={cl.left__items}>
          <img src={left} alt='' />
        </div>
        <div className={cl.right__items}>
          <div className={cl.item}>
            <img src={right1} alt='' />
          </div>
          <div className={cl.item}>
            <img src={right2} alt='' />
          </div>
          <div className={cl.item}>
            <img src={right3} alt='' />
          </div>
          <div className={cl.item}>
            <img src={right4} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};
