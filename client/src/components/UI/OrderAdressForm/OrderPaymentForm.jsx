import React from "react";
import cl from "../../../style/Payment.module.css";

export const OrderPaymentForm = ({
  setCardNumber,
  cardNumber,
  setCardName,
  cardName,
  setCardDate,
  cardDate,
  setCardCVC,
  cardCVC,
  updateState,
  nextStep,
}) => {
  const showWidget = () => {};

  return (
    <div className={cl.inputs}>
      <div className={cl.inputsTitle}>Кредитная карта</div>
      <div className={cl.inputContainer}>
        <input
          placeholder='Номер карты'
          type='text'
          className={cl.inputWide}
          onChange={(e) => {
            updateState(e, setCardNumber);
          }}
          value={cardNumber}
        />
      </div>
      <div className={cl.inputContainer}>
        <input
          placeholder='Полное имя на карте'
          type='text'
          className={cl.inputWide}
          onChange={(e) => {
            updateState(e, setCardName);
          }}
          value={cardName}
        />
      </div>
      <div className={cl.inputsContainer}>
        <div className={cl.inputContainer}>
          <input
            placeholder='Срок действия (MM/ГГ)'
            type='text'
            className={cl.input}
            onChange={(e) => {
              updateState(e, setCardDate);
            }}
            value={cardDate}
          />
        </div>
        <div className={cl.inputContainer}>
          <input
            placeholder='CVC/CVV'
            type='text'
            className={cl.input}
            onChange={(e) => {
              updateState(e, setCardCVC);
            }}
            value={cardCVC}
          />
        </div>
      </div>
      <div className={cl.buttonView}>
        <div className={cl.button} onClick={nextStep}>
          Оплатить
        </div>
      </div>
      <div className={cl.deliveryText}>
        <div className={cl.deliveryTitle}>Условия доставки</div>
        Доставка занимает ~ 2 - 10 рабочих дня и зависит от загруженности
        курьерской и почтовой службы. Каждый криэйтор в вашем заказе формирует
        отдельную посылку.
      </div>
    </div>
  );
};
