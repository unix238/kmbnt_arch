import React from "react";
import { Button } from "../Button/Button";
import cl from "./Footer.module.css";
import { Facebook } from "../../UI/Icons/Facebook";
import { Telegram } from "../../UI/Icons/Telegram";
import { Twitter } from "../../UI/Icons/Twitter";
import { Instagram } from "../../UI/Icons/Instagram";
import { Youtube } from "../../UI/Icons/Youtube";

export const Footer = () => {
  return (
    <div className={cl.footer}>
      <div className={cl.footer__main}>
        <div className={cl.wrapper}>
          <div className={cl.footer__main}>
            <div className={cl.footer__left}>
              <div className={cl.footer__title}>Администратор объединения:</div>
              <div className={cl.footer__subtitle}>
                +7 (777) 123 4567 <br /> info@kmbinat.kz
              </div>
            </div>
            <div className={cl.footer__right}>
              <div className={cl.footer__title}>
                © 2022 KMBINAT. Все права защищены.
              </div>
              <div className={cl.footer__subtitle}>
                «KMBINAT» является зарегистрированным товарным знаком, любое
                использование без письменного разрешения правообладателя
                запрещено.
              </div>
              <div className={cl.spacer}></div>
              <div className={cl.footer__subtitle}>
                Пользовательское соглашение
              </div>
              <div className={cl.links}>
                <a
                  className={cl.link}
                  href='https://t.me/kmbinat'
                  target='blank'
                >
                  <Telegram />
                </a>
                {/* <div className={cl.link}>
                  <Facebook />
                </div>
                <div className={cl.link}>
                  <Twitter />
                </div> */}
                <a
                  className={cl.link}
                  href='https://www.instagram.com/kmbinat'
                  target='blank'
                >
                  <Instagram />
                </a>
                {/* <div className={cl.link}>
                  <Youtube />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
