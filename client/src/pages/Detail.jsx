import React, { useState, useEffect } from "react";
import "../style/detail.css";
import { Help } from "../components/UI/Icons/Help";
import { Recent } from "../components/UI/Recent/Recent";
import ServiceApi from "../api/ServiceApi";
import { Loader } from "../components/UI/Loader/Loader";
import {
  addItemToBasket,
  addRecentItem,
  addItemToFavorite,
} from "../rtk/toolkitReducer";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/UI/Header/Header";
import { ContactForm } from "../components/UI/ContactForm/ContactForm";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import config from "../utils/config";

export const Detail = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [recent, setRecent] = useState([]);
  const items = useSelector((state) => state.toolkit.items);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.toolkit.favorite);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const router = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const addToBasket = (item) => {
    if (items.filter((i) => i._id === item._id).length > 0) {
      NotificationManager.success("Товар убран из корзины");
    } else {
      NotificationManager.success("Товар добавлен в корзину");
    }
    dispatch(addItemToBasket({ ...item, quantity: 1, size: size }));
  };

  const addToFav = (item) => {
    if (favorites.filter((i) => i._id === item._id).length > 0) {
      NotificationManager.success("Товар убран из избранного");
    } else {
      NotificationManager.success("Товар добавлен в избранное");
    }
    dispatch(addItemToFavorite({ ...item, quantity: 1, size: size }));
  };

  const loadData = async () => {
    const location = window.location.pathname.split("/")[2];
    const item = await ServiceApi.getItemByID(location);
    setItem(item);
    setIsLoading(false);
  };

  const inBasket = (id) => {
    return items.filter((item) => item._id === id).length > 0;
  };

  const onBrandClick = () => {
    navigate("/items", { state: { brand: item.brand._id } });
  };

  const onSellerClick = () => {
    navigate("/items", { state: { seller: item.seller._id } });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [router]);

  useEffect(() => {
    if (item != null) {
      dispatch(addRecentItem(item));
    }
  }, [item]);

  return !isLoading ? (
    <>
      <Header />
      <div className='detail'>
        <div className='wrapper'>
          <div className='detail'>
            <div className='detail__left'>
              <div className='images'>
                <div className='image__galery'>
                  <div className='breadcrumbs' id='style-1'>
                    {item.images.map((image, index) => {
                      return (
                        <div
                          className={
                            currentImage === index
                              ? "breadcrum__image__active"
                              : "breadcrum__image"
                          }
                          key={`breadcrum${index}`}
                          onClick={() => setCurrentImage(index)}
                        >
                          <img src={config.upload + image} alt='' />
                        </div>
                      );
                    })}
                  </div>
                  <div className='main__image'>
                    <div className='current__image'>
                      <img
                        src={config.upload + item.images[currentImage]}
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='description left desc__top'>
                <div className='sign'>
                  <Help />
                </div>
                <div className='decripition__title'>Описание</div>
                <div className='decripition__subtitle'>{item.descriptions}</div>
                <div className='decripition__subtitle'>{item.descriptions}</div>
              </div>
            </div>
            <div className='detail__right'>
              <div className='container'>
                <div className='title'>{item.title}</div>
                <div className='brand' onClick={onBrandClick}>
                  {item?.brand?.title}
                </div>
                {/* <div className='brand' onClick={onSellerClick}>
                  {item?.seller?.name}
                </div> */}
                <div className='price'>
                  {item.price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  ₸
                </div>
                <div className='size__choose'>
                  <div className='size__subtitle'>Таблица размеров</div>
                  <div className='select__size'>
                    <select
                      className='select'
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSize(e.target.value);
                      }}
                    >
                      <option
                        title='dads'
                        value='Выберите размер'
                        disabled
                        selected
                      >
                        Выберите размер
                      </option>
                      {item.sizes.map((size) => (
                        <option value={size} key={`${size}size`}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <div className='button__group'>
                      <div
                        className='btn add__to__favor'
                        onClick={() => addToFav(item)}
                      >
                        В избранное
                      </div>

                      <div
                        className='btn add__to__cart'
                        onClick={() => addToBasket(item)}
                      >
                        {/* Добавить в корзину */}
                        {inBasket(item._id) ? "Убрать из корзины" : "В корзину"}
                      </div>
                    </div>
                  </div>

                  <div className='description left'>
                    <div className='sign'>
                      <Help />
                    </div>
                    <div className='decripition__title'>Описание</div>
                    <div className='decripition__subtitle'>
                      {item.characteristics}
                    </div>
                    <div className='decripition__title'>
                      Примерная дата доставки:
                    </div>
                    <div className='decripition__subtitle'>
                      {/* 23 июня — 1 июля */}
                      {new Date().toLocaleDateString()} -{" "}
                      {
                        // date and date after 7 days
                        new Date(
                          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='recent'>
        <Recent cards={recent} />
      </div>
      <ContactForm />
    </>
  ) : (
    <>
      <Header />
      <Loader />
      <ContactForm />
    </>
  );
};
