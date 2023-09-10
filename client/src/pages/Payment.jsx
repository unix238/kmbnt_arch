import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect, useLocation } from "react-router-dom";
import { Header } from "../components/UI/Header/Header";
import { BasketCard } from "../components/UI/BasketCard/BasketCard";
import cl from "../style/Payment.module.css";
import ServiceApi from "../api/ServiceApi";
import { OrderCard } from "../components/UI/OrderCard/OrderCard";
import { validateAddress, validateCard } from "../utils/validate";
import { OrderAdressForm } from "../components/UI/OrderAdressForm/OrderAdressForm";
import { OrderPaymentForm } from "../components/UI/OrderAdressForm/OrderPaymentForm";
import PaymentApi from "../api/PaymentApi";

export const Payment = ({ props }) => {
  let location = useLocation();
  const basketItems = location.state.items;

  const [currentStep, setCurrentStep] = useState(1);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [index, setIndex] = useState("");
  const [address, setAddress] = useState("");
  const [totalCosts, setTotalCosts] = useState(0);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = await ServiceApi.checkToken(token);
        setUser(user);
        console.log(user);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const updateState = (e, state) => {
    state(e.target.value);
  };

  const setupWidget = () => {
    // window.FreedomPaySDK.setup('mypublickey', 'lU9HFGGboiFuEZvM');
  };

  const pay = async (amount) => {
    const sendItems = items.map((item) => ({
      id: item._id,
      size: item.size,
    }));
    const order = {
      items: sendItems,
      deliveryData: {
        country,
        name: name + " " + surname,
        surname,
        phone,
        city,
        index,
        address,
        zipCode: index,
      },
    };
    const makeOrder = await PaymentApi.addOrder(order);
    window.location.replace(makeOrder.data);
  };

  const nextStep = () => {
    if (currentStep == 1) {
      if (
        validateAddress({ country, name, surname, phone, city, index, address })
      ) {
        pay(totalCosts);
      } else {
        alert("Заполните все поля!");
      }
    }
    if (currentStep == 2) {
      if (validateCard(cardNumber, cardName, cardDate, cardCVC)) {
        setCurrentStep(3);
      } else {
        alert("Заполните все поля!");
      }
    }
  };

  const loadData = async () => {
    console.log(basketItems);
    try {
      // basketItems.map(async (item) => {
      //   const newItem = await ServiceApi.getItemByID(item._id);
      //   setItems((prev) => [
      //     ...prev,
      //     { ...newItem, quantity: item.quantity, size: item.size },
      //   ]);
      // });
      const items = await Promise.all(
        basketItems.map(async (item) => {
          const newItem = await ServiceApi.getItemByID(item._id);
          return { ...newItem, quantity: item.quantity, size: item.size };
        })
      );
      setItems(items);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(items);
    loadData();
    loadUser();
  }, []);

  useEffect(() => {
    setTotalCosts(
      items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0)
    );
  }, [items]);

  useEffect(() => {
    setAddress(user?.deliveryData?.address);
    setCountry(user?.deliveryData?.country);
    setCity(user?.deliveryData?.city);
    setIndex(user?.deliveryData?.zipCode);
    setName(user?.name?.split(" ")[0]);
    setSurname(user?.deliveryData?.name?.split(" ")[1]);
    setPhone(user?.deliveryData?.phone);
  }, [user]);

  return (
    <>
      <Header />
      <div className='wrapper'>
        <div className={cl.container}>
          <div className={cl.mainTitle}>Оплата</div>
          <div className={cl.flexContainer}>
            {/* <Steps /> */}
            {currentStep == 1 ? (
              <OrderAdressForm
                country={country}
                setCountry={setCountry}
                name={name}
                setName={setName}
                surname={surname}
                setSurname={setSurname}
                phone={phone}
                setPhone={setPhone}
                city={city}
                setCity={setCity}
                index={index}
                setIndex={setIndex}
                address={address}
                setAddress={setAddress}
                updateState={updateState}
                nextStep={nextStep}
              />
            ) : currentStep == 2 ? (
              <OrderPaymentForm
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardName={cardName}
                setCardName={setCardName}
                cardDate={cardDate}
                setCardDate={setCardDate}
                cardCVC={cardCVC}
                setCardCVC={setCardCVC}
                updateState={updateState}
                nextStep={nextStep}
              />
            ) : null}

            <div className={cl.basket}>
              <div className={cl.basketItems}>
                {items.map((item) => {
                  return <OrderCard item={item} />;
                })}
              </div>
              <div className={cl.promocode}>
                <div className={cl.inputContainer}>
                  <input
                    type='text'
                    className={cl.inputWide}
                    placeholder='Введите промокод'
                  />
                </div>
                <div className={cl.button}>Применить</div>
              </div>

              <div className='prices'>
                <div className={cl.positions}>
                  <div className={cl.itemCosts}>
                    <div className={[cl.costLeft, cl.subtitle].join(" ")}>
                      Доставка
                    </div>
                    <div className={[cl.costLeft, cl.subtitle].join(" ")}>
                      1000 ₸
                    </div>
                  </div>
                  <div className={cl.itemCosts}>
                    <div className={[cl.costLeft, cl.subtitle].join(" ")}>
                      Товары
                    </div>
                    <div className={[cl.costLeft, cl.subtitle].join(" ")}>
                      {totalCosts} ₸
                    </div>
                  </div>
                </div>
                <div className={cl.total}>
                  <div className={[cl.costLeft, cl.subtitle].join(" ")}>
                    Итого к оплате
                  </div>
                  <div className={[cl.costLeft, cl.subtitle].join(" ")}>
                    {totalCosts + 1000} ₸
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
