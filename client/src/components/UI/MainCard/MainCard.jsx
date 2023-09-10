/** @format */

import React from "react";
import { Button } from "../Button/Button";
import cl from "./MainCard.module.css";
import { useNavigate } from "react-router-dom";

export const MainCard = ({
  image,
  title,
  subTitle,
  secondSubTitle,
  link,
  isImageLeft,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div className={cl.news__card}>
      <div className={cl.news__card__left}>
        {isImageLeft ? (
          <img src={image} className={cl.img} />
        ) : (
          <>
            <div className={cl.news__card__title}>{title}</div>
            <div className={cl.news__card__subtitle}>
              {subTitle}
              <div className={cl.news__card__subtitle}>{secondSubTitle}</div>
            </div>
            <Button
              link={link}
              onClick={() => {
                console.log("zczx");
                navigate(`/news/${id}`);
              }}
            />
          </>
        )}
      </div>
      <div className={cl.news__card__right}>
        {!isImageLeft ? (
          <img src={image} className={cl.img} />
        ) : (
          <>
            <div className={cl.news__card__title}>{title}</div>
            <div className={cl.news__card__subtitle}>
              {subTitle}
              <div className={cl.news__card__subtitle}>{secondSubTitle}</div>
            </div>
            <Button
              onClick={() => {
                console.log("zczx");
                navigate(`/news/${id}`);
              }}
              link={link}
            />
          </>
        )}
      </div>
    </div>
  );
};
