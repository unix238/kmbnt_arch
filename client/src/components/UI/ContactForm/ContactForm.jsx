import React from 'react';
import cl from './ContactForm.module.css';
import { Button } from '../Button/Button';

export const ContactForm = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.contact__form}>
        <div className={cl.form__title}>Связаться с нами</div>
        <div className={cl.form__subtitle}>
          Поля, отмеченные звездочкой (*) обязательны для заполнения.
        </div>
        <div className={cl.form__inputs}>
          <div className={cl.input__block}>
            <label htmlFor='name'>Имя*</label>
            <input type='name' className={cl.name} name='name' />
          </div>
          <div className={cl.input__block}>
            <label htmlFor='surname'>Фамилия*</label>
            <input type='surname' className={cl.surname} name='surname' />
          </div>
          <div className={cl.input__block}>
            <label htmlFor='email'>e-mail*</label>
            <input type='email' className={cl.email} name='email' />
          </div>
          <div className={cl.input__block}>
            <label htmlFor='phone'>Номер телефона</label>
            <input type='phone' className={cl.phone} name='phone' />
          </div>
          <div className={[cl.input__block, cl.message].join(' ')}>
            <label htmlFor='message'>Сообщение</label>
            <textarea
              className={cl.message}
              placeholder='Напишите что–нибудь'
              name='message'
            />
          </div>
        </div>
        <div className={cl.form__submit}>
          <Button
            style={{
              width: '220px',
              height: '38px',
            }}
            text='Отправить →'
          />
        </div>
      </div>
    </div>
  );
};
