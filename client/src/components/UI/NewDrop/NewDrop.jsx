import React from 'react';

import tempImage from '../../../img/triko.png';
import tempImage2 from '../../../img/kurtka.png';
import tempImage3 from '../../../img/rubashka.png';

import { Button } from '../Button/Button';

import cl from './NewDrop.module.css';

export const NewDrop = () => {
  return (
    <div className={cl.new__thigns}>
      <div className={cl.new__things__title}>Новый дроп от Ekkinshi™</div>
      <div className={cl.new__things__subtitle}>
        Каждую модель можно посмотреть в основном аккаунте, принты тканей стоят
        особого внимания!
      </div>
      <div className={cl.new__things__subtitle}>
        В наличии много вещей ручной работы в одном экземпляре.
      </div>
      <div className={cl.new__things__cards}>
        <div className={cl.new__things__card}>
          <div className={cl.new__things__card__image}>
            <img src={tempImage} />
          </div>
          <div className={cl.new__things__card__title}>Трико</div>
          <div className={cl.new__things__card__subtitle}>
            Лёгкие, натуральные ткани, кастомизация, внимание к деталям.
          </div>
          <Button text={'Добавить'} />
        </div>

        <div className={cl.new__things__card}>
          <div className={cl.new__things__card__image}>
            <img src={tempImage2} />
          </div>
          <div className={cl.new__things__card__title}>Трико</div>
          <div className={cl.new__things__card__subtitle}>
            Лёгкие, натуральные ткани, кастомизация, внимание к деталям.
          </div>
          <Button text={'Добавить'} />
        </div>

        <div className={cl.new__things__card}>
          <div className={cl.new__things__card__image}>
            <img src={tempImage3} />
          </div>
          <div className={cl.new__things__card__title}>Трико</div>
          <div className={cl.new__things__card__subtitle}>
            Лёгкие, натуральные ткани, кастомизация, внимание к деталям.
          </div>
          <Button text={'Добавить'} />
        </div>
      </div>
    </div>
  );
};
