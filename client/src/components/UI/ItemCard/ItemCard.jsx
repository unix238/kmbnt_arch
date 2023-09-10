import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ShoppingCart } from "../Icons/ShoppingCart";
import { ShareCard } from "../Icons/ShareCard";
import { FavoriteCardIcon } from "../Icons/FavoriteCardIcon";

import {
  addItemToBasket,
  addItemToFavorite,
} from "../../../rtk/toolkitReducer";

import cl from "./ItemCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Favorite } from "../Icons/Favorite";

import config from "../../../utils/config";
import ServiceApi from "../../../api/ServiceApi";

export const ItemCard = ({ item, style }) => {
  const items = useSelector((state) => state.toolkit.items);
  const favorites = useSelector((state) => state.toolkit.favorite);
  const dispatch = useDispatch();
  const router = useNavigate();

  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [inBasket, setInBasket] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);

  const checkBasket = () => {
    if (items.filter((i) => i._id === item._id).length > 0) {
      setInBasket(true);
    } else {
      setInBasket(false);
    }
  };

  const checkFavorite = () => {
    if (favorites.filter((i) => i._id === item._id).length > 0) {
      setInFavorite(true);
    } else {
      setInFavorite(false);
    }
  };

  const addToBasket = (item) => {
    if (items.filter((i) => i._id === item._id).length > 0) {
      NotificationManager.success("Товар убран из корзины");
    } else {
      NotificationManager.success("Товар добавлен в корзину");
    }
    dispatch(addItemToBasket({ ...item, quantity: 1, size: "1" }));
  };

  const addToFav = (item) => {
    if (favorites.filter((i) => i._id === item._id).length > 0) {
      NotificationManager.success("Товар убран из избранного");
    } else {
      NotificationManager.success("Товар добавлен в избранное");
    }
    dispatch(addItemToFavorite({ ...item, quantity: 1, size: "1" }));
  };

  const onBrandClick = () => {
    navigate("/items", { state: { brand: item.brand._id } });
  };

  const loadBrand = async () => {
    const brands = await ServiceApi.getBrands();
    const brand = brands.filter((i) => i._id === item.brand);
    setBrand(brand[0]);
  };

  useEffect(() => {
    checkBasket();
    checkFavorite();
    loadBrand();
  }, [items]);

  return (
    <div className={cl.item__card}>
      <div className={cl.item__image}>
        <div className={cl.fav__icon}>
          {!inFavorite ? (
            <FavoriteCardIcon
              addToFavorite={() => {
                addToFav(item);
                setInFavorite(!inFavorite);
              }}
            />
          ) : (
            <FavoriteCardIcon
              color={"red"}
              addToFavorite={() => {
                addToFav(item);
                setInFavorite(!inFavorite);
              }}
            />
          )}
        </div>
        <img
          // src={item.images[0]}
          src={
            Array.isArray(item.images)
              ? config.upload + item.images[0]
              : config.upload + item.images
          }
          alt={item.name}
          onClick={() => {
            router(`/item/${item._id}`);
          }}
        />
      </div>
      <div className={cl.item__text}>
        <div className={cl.top}>
          <div
            className={cl.item__title}
            onClick={() => {
              router(`/item/${item._id}`);
            }}
          >
            {item.title}
          </div>
          <div
            // onClick={onBrandClick}
            className={`${cl.item__subtitle} ${cl.brand}`}
            style={style}
          >
            {brand && brand.title}
          </div>
          <div className={cl.item__subtitle} style={style}>
            {item.descriptions}
          </div>
        </div>

        <div className={cl.item__other}>
          <div className={cl.item__price}>
            {item.price.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            ₸
          </div>
          <div className={cl.item__links}>
            <div
              onClick={() => {
                addToBasket(item);
              }}
            >
              {!inBasket ? <ShoppingCart /> : <ShoppingCart color={"#000"} />}
            </div>
            <div>
              <ShareCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
