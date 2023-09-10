import React from 'react';
import cl from '../../../style/Payment.module.css';

export const OrderAdressForm = ({
  setCountry,
  country,
  setName,
  name,
  setSurname,
  surname,
  setPhone,
  phone,
  setCity,
  city,
  setIndex,
  index,
  setAddress,
  address,
  updateState,
  nextStep,
}) => {
  return (
    <div className={cl.inputs}>
      <div className={cl.inputsTitle}>Адрес доставки</div>
      <div className={cl.inputContainer}>
        <input
          placeholder='Страна / регион'
          type='text'
          className={cl.inputWide}
          onChange={(e) => {
            updateState(e, setCountry);
          }}
          value={country}
        />
      </div>
      <div className={cl.inputsContainer}>
        <div className={cl.inputContainer}>
          <input
            placeholder='Имя'
            type='text'
            className={cl.input}
            onChange={(e) => {
              updateState(e, setName);
            }}
            value={name}
          />
        </div>
        <div className={cl.inputContainer}>
          <input
            placeholder='Фамилия'
            type='text'
            className={cl.input}
            onChange={(e) => {
              updateState(e, setSurname);
            }}
            value={surname}
          />
        </div>
      </div>
      <div className={cl.inputContainer}>
        <input
          placeholder='Номер телефона'
          type='text'
          className={cl.inputWide}
          onChange={(e) => {
            updateState(e, setPhone);
          }}
          value={phone}
        />
      </div>
      <div className={cl.inputsContainer}>
        <div className={cl.inputContainer}>
          <input
            placeholder='Город'
            type='text'
            className={cl.input}
            onChange={(e) => {
              updateState(e, setCity);
            }}
            value={city}
          />
        </div>
        <div className={cl.inputContainer}>
          <input
            placeholder='Почтовый индекс'
            type='text'
            className={cl.input}
            onChange={(e) => {
              updateState(e, setIndex);
            }}
            value={index}
          />
        </div>
      </div>
      <div className={cl.inputContainer}>
        <input
          placeholder='Точный адрес местожительства'
          type='text'
          className={cl.inputWide}
          onChange={(e) => {
            updateState(e, setAddress);
          }}
          value={address}
        />
      </div>
      <div className={cl.buttonView}>
        <div className={cl.button} onClick={nextStep}>
          Далее
        </div>
      </div>
    </div>
  );
};
