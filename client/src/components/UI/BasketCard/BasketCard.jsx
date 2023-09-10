import React, { useState } from "react";
import cl from "./BasketCard.module.css";
import { Select } from "../Select/Select";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItemToBasket,
  setQuantity,
  setSize,
} from "../../../rtk/toolkitReducer";

import config from "../../../utils/config";

export const BasketCard = ({ item, size }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const dispatch = useDispatch();
  const router = useNavigate();

  return isDeleted ? null : (
    <div className={cl.item}>
      <div className={cl.left}>
        <div
          style={{ cursor: "pointer" }}
          className={cl.image}
          onClick={() => {
            router("/item/" + item._id);
          }}
        >
          <img
            src={config.upload + item.images[0]}
            alt='clock'
            className={cl.img}
          />
        </div>
        <div className={cl.text}>
          <div className={cl.topText}>
            <div className={cl.title}>{item.title}</div>
            <div
              className={cl.subtitle}
              style={{ cursor: "pointer" }}
              onClick={() => {
                router("/item/" + item._id);
              }}
            >
              {item.title}
              <div className={cl.subtitle}>
                {item.price.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                ₸
              </div>
            </div>
          </div>
          <div className={cl.bottomText}>
            <div className={cl.subtitle}>Доставка из:</div>
            <div className={cl.title}>Казахстан, {item.deliveryFrom}</div>
          </div>
        </div>
      </div>
      <div className={cl.right}>
        <div className={cl.select__size}>
          <Select
            style={{ width: "220px" }}
            onChange={(e) => {
              dispatch(setSize({ id: item._id, size: e.target.value }));
            }}
          >
            <option value={item.quantity}>
              Размер: {item.sizes.includes(size) ? size : item.sizes[0]}
            </option>

            {item.sizes.map((s) => {
              if (s != size) {
                return (
                  <option value={s} key={s}>
                    Размер: {s}
                  </option>
                );
              }
            })}
          </Select>
          {/* <Select
            style={{ width: '220px' }}
            onChange={(e) => {
              console.log(e.target.value);

              dispatch(setQuantity({ id: item._id, quantity: e.target.value }));
            }}
          >
            <option value={item.quantity}>Количество: {item.quantity}</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
              return (
                <option key={`q${i}`} value={i}>
                  Количество: {i}
                </option>
              );
            })}
          </Select> */}
        </div>
        <div
          className={cl.delete}
          onClick={() => {
            setIsDeleted(true);
            dispatch(addItemToBasket(item));
          }}
        >
          удалить X
        </div>
      </div>
    </div>
  );
};
