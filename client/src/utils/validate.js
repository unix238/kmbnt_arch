export const validatePhone = (phone) => {
  // regex for phone number validation
  // example: +79999999999 or 89999999999
  const regex = /^(\+7|8)(\d{10})$/;
  return regex.test(phone);
};
export const validateEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return regex.test(email);
};

export const validateCardNumber = (cardNumber) => {
  const regex = /^[0-9]{16}$/;
  return regex.test(cardNumber);
};

export const validateCardHolder = (cardHolder) => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(cardHolder);
};

export const validateCardExpiry = (cardExpiry) => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(cardExpiry);
};

export const validateCardCvv = (cardCvv) => {
  const regex = /^[0-9]{3}$/;
  return regex.test(cardCvv);
};

export const validateCard = (card) => {
  const { cardNumber, cardHolder, cardExpiry, cardCvv } = card;
  return (
    validateCardNumber(cardNumber) &&
    validateCardHolder(cardHolder) &&
    validateCardExpiry(cardExpiry) &&
    validateCardCvv(cardCvv)
  );
};

export const validateAddress = (fullAddress) => {
  const { country, name, surname, phone, city, index, address } = fullAddress;
  return country && name && phone && city && index && address && phone;
};
