import React, { useState, useEffect } from "react";
import cl from "./Profile.module.css";
import { Header } from "../components/UI/Header/Header";
import { Link } from "react-router-dom";
import { Logo } from "../components/UI/Icons/Logo";
import { Search } from "../components/UI/Icons/Search";
import { Menu } from "../components/UI/Icons/Menu";
import { Home } from "../components/UI/Icons/Home";
import { Help } from "../components/UI/Icons/Help";
import { Favorite } from "../components/UI/Icons/Favorite";
import { ShoppingBag } from "../components/UI/Icons/ShoppingBag";
import { Account } from "../components/UI/Icons/Account";
import { Button } from "../components/UI/Button/Button";
import ServiceApi from "../api/ServiceApi";
import pfp from "../img/defaultPFP.png";
import PaymentApi from "../api/PaymentApi";
import { ItemCard } from "../components/UI/ItemCard/ItemCard";

export const Profile = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeliveryCardOpen, setIsDeliveryCardOpen] = React.useState(false);
  const [isContactCardOpen, setIsContactCardOpen] = React.useState(false);
  const [isPaymentCardOpen, setIsPaymentCardOpen] = React.useState(false);

  const [myOrders, setMyOrders] = React.useState([]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const [user, setUser] = useState(null);

  const loadOrders = async () => {
    const response = await PaymentApi.getOrders();
    setMyOrders(response?.data?.orders);
  };

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

  const contactModalHandler = async () => {
    const request = await ServiceApi.updateUser({
      id: user._id,
      name: name,
      surname: surname,
      phone: phone,
    });
    console.log(request);
    if (request.status === 200) {
      setIsContactCardOpen(false);
      loadUser();
    } else {
      alert("Ошибка при обновлении данных");
    }
  };

  const deliveryDataModalHandler = async () => {
    const request = await ServiceApi.updateDelivery({
      id: user._id,
      country: country,
      city: city,
      zipCode: zipCode,
      address: address,
      phone: phone,
    });
    console.log(request);
  };

  useEffect(() => {
    loadUser();
  }, [isContactCardOpen]);

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <>
      <div className={cl.h}>
        <div className={cl.headerTop}>
          <div className={cl.wrapper}>
            <div className={cl.headerItems}>
              <div className={cl.logo}>
                <Link to='/'>
                  <Logo width={110} height={20} />
                </Link>
              </div>
              <div className={cl.search}>
                <Search width={20} height={20} />
              </div>
              <div
                className={cl.menuICON}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Menu width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
        <div className={cl.headerMain}>
          <div className={cl.wrapper}>
            <div className={cl.headerLinks}>
              <div className={cl.link}>
                <Link to='/'>
                  <Home width={"25"} height={"25"} />
                </Link>
              </div>
              <div className={cl.otherLinks}>
                <div className={cl.link}>
                  <Help width={"25"} height={"25"} />
                </div>
                {/* <div className={cl.link}>
                <Notifications width={'25'} height={'25'} />
              </div> */}
                <div className={cl.link}>
                  <Link to='/wishlist'>
                    <Favorite width={"25"} height={"25"} />
                  </Link>
                </div>
                <div className={cl.link}>
                  <Link to={`/basket`}>
                    <ShoppingBag width={"25"} height={"25"} />
                  </Link>
                </div>
                <div className={cl.link}>
                  <Link to='/profile'>
                    <Account width={"25"} height={"25"} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cl.wrapper}>
        <div className={cl.profile__selectorView}>
          <div
            onClick={() => setCurrentTab(0)}
            className={`${
              currentTab == 0
                ? cl.profile__selector__active
                : cl.profile__selector
            }`}
          >
            Личные данные
          </div>
          <div
            onClick={() => setCurrentTab(1)}
            className={`${
              currentTab == 1
                ? cl.profile__selector__active
                : cl.profile__selector
            }`}
          >
            Мои заказы
          </div>
        </div>
        <div className={cl.main}>
          {currentTab === 0 && (
            <>
              <div className={cl.card}>
                {!isContactCardOpen ? (
                  <>
                    <div className={cl.cardTop}>
                      <div
                        className={cl.edit}
                        onClick={() => setIsContactCardOpen(true)}
                      >
                        Редактировать
                      </div>
                    </div>
                    <div className={cl.contactCardWrapper}>
                      <div className={cl.ccwLeft}>
                        <div className={cl.image}>
                          <img src={pfp} alt='' className={cl.img} />
                        </div>
                      </div>
                      <div className={cl.ccwRight}>
                        <div className={cl.name}>
                          {user?.name || "Заполните поле"}
                        </div>
                        <div className={cl.phone}>
                          Номер телефона: {user?.phone || "заполните поле"}
                        </div>
                        <div className={cl.email}>
                          E-mail: {user?.email || "заполните поле"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={cl.cctop}>
                      <div className={cl.image}>
                        <img src={pfp} alt='' className={cl.img} />
                      </div>
                    </div>
                    <div className={cl.ccbody}>
                      <div className={cl.input}>
                        <div className={cl.label}>Имя</div>
                        <input
                          type='text'
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          className={cl.ccinput}
                          placeholder='Введите имя'
                        />
                      </div>
                      <div className={cl.input}>
                        <div className={cl.label}>Фамилия</div>
                        <input
                          type='text'
                          value={surname}
                          onChange={(e) => {
                            setSurname(e.target.value);
                          }}
                          className={cl.ccinput}
                          placeholder='Введите Фамилию'
                        />
                      </div>
                      <div className={cl.input}>
                        <div className={cl.label}>e-mail</div>
                        <input
                          type='text'
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className={cl.ccinput}
                          placeholder='example@gmail.com'
                        />
                      </div>
                      <div className={cl.input}>
                        <div className={cl.label}>Номер телефона </div>
                        <input
                          type='text'
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          className={cl.ccinput}
                          placeholder='+7 ( ___ ) - ___ - __ - __ '
                        />
                      </div>
                    </div>
                    <div className={cl.button}>
                      <Button
                        text='Сохранить ->'
                        onClick={contactModalHandler}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className={cl.card}>
                {!isPaymentCardOpen ? (
                  <>
                    <div className={cl.cardTop}>
                      <div
                        className={cl.edit}
                        onClick={() => setIsPaymentCardOpen(true)}
                      >
                        Редактировать
                      </div>
                    </div>
                    <div className={cl.contactCardWrapper}>
                      <div className={cl.Right}>
                        <div className={cl.name}>Адрес доставки</div>
                        <div className={cl.phone}>
                          Страна:{" "}
                          {user?.deliveryData?.country || "заполните поле"}
                        </div>
                        <div className={cl.phone}>
                          Город: {user?.deliveryData?.city || "заполните поле"}
                        </div>
                        <div className={cl.phone}>
                          Почтовый индекс:{" "}
                          {user?.deliveryData?.zipCode || "заполните поле"}
                        </div>
                        <div className={cl.phone}>
                          Точный адрес местожительства:{" "}
                          {user?.deliveryData?.address || "заполните поле"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={cl.dtop}>Адрес доставки</div>
                    <div className={cl.dtbody}>
                      <div className={cl.input}>
                        <div className={cl.label}>Страна/регион</div>
                        <input
                          type='text'
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                          className={cl.ccinput}
                          placeholder='Страна'
                        />
                      </div>
                      <div className={cl.inputs}>
                        <div className={cl.input}>
                          <div className={cl.label}>Имя получателя</div>
                          <input
                            type='text'
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            className={cl.ccinput}
                            placeholder='Вероника'
                          />
                        </div>
                        <div className={cl.input}>
                          <div className={cl.label}>Фамилия получателя</div>
                          <input
                            type='text'
                            value={surname}
                            onChange={(e) => {
                              setSurname(e.target.value);
                            }}
                            className={cl.ccinput}
                            placeholder='Жангалова'
                          />
                        </div>
                      </div>
                      <div className={cl.input}>
                        <div className={cl.label}>Номер телефона </div>
                        <input
                          type='text'
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          className={cl.ccinput}
                          placeholder='+7-(777)-777-77-77'
                        />
                      </div>

                      <div className={cl.inputs}>
                        <div className={cl.input}>
                          <div className={cl.label}>Город</div>
                          <input
                            type='text'
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            className={cl.ccinput}
                            placeholder='Город'
                          />
                        </div>
                        <div className={cl.input}>
                          <div className={cl.label}>Индекс</div>
                          <input
                            type='text'
                            value={zipCode}
                            onChange={(e) => {
                              setZipCode(e.target.value);
                            }}
                            className={cl.ccinput}
                            placeholder='Индекс'
                          />
                        </div>
                      </div>

                      <div className={cl.input}>
                        <div className={cl.label}>Точный адрес проживания </div>
                        <input
                          type='text'
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          className={cl.ccinput}
                          placeholder='ул. Кабанбай батыр 53'
                        />
                      </div>
                    </div>
                    <div className={cl.button}>
                      <Button
                        text='Сохранить ->'
                        onClick={deliveryDataModalHandler}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          {currentTab === 1 && (
            <>
              {myOrders?.map((order) => (
                <div className={cl.order}>
                  <div className={cl.orderText}>
                    <div className={cl.left}>
                      <div className={cl.orderTitle}>
                        ID Заказа: {order?._id}
                      </div>
                      <div className={cl.orderTitle}>
                        ID Платежа: {order?._id}
                      </div>
                      <div className={cl.orderTitle}>
                        Дата оплаты:{" "}
                        {new Date(order?.paymentDate).toLocaleString()}
                      </div>
                      <div className={cl.orderTitle}>
                        Способо оплаты: {order?.paymentCardPan}
                      </div>
                    </div>
                    <div className={cl.right}>
                      <div className={cl.orderTitle}>
                        Имя: {order?.deliveryData?.name}
                      </div>
                      <div className={cl.orderTitle}>
                        Город: {order?.deliveryData?.city}
                      </div>
                      <div className={cl.orderTitle}>
                        Адрес: {order?.deliveryData?.address}
                      </div>
                      <div className={cl.orderTitle}>
                        Контактный номер телефона:{order?.deliveryData?.phone}
                      </div>
                    </div>
                  </div>
                  <div className={cl.orderDate}></div>
                  <div className={cl.items}>
                    {order.items.map((item) => (
                      <ItemCard item={item.item} size={item.size} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
