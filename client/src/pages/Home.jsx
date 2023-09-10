import React, { useState } from "react";
import "../style/home.css";
import { MainCard } from "../components/UI/MainCard/MainCard";
import { SectionDivider } from "../components/UI/SectionDivider/SectionDivider";
import { Button } from "../components/UI/Button/Button";
import { NewDrop } from "../components/UI/NewDrop/NewDrop";
import { SpecialOffer } from "../components/UI/SpecialOffer/SpecialOffer";
import { Header } from "../components/UI/Header/Header";

import { Help } from "../components/UI/Icons/Help";

import card from "../img/card.png";

import ServiceApi from "../api/ServiceApi";
import { ContactForm } from "../components/UI/ContactForm/ContactForm";

export const Home = () => {
  const [posts, setPosts] = useState([{}]);

  const loadData = async () => {
    const data = await ServiceApi.getPosts();
    setPosts(data);
  };

  useState(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />
      <div className='home'>
        <div className='wrapper'>
          <div className='news'>
            <div className='news__cards'>
              {posts.map((post, index) => (
                <MainCard
                  image={post.image}
                  title={post.title}
                  subTitle={post.subTitle}
                  secondSubTitle={post.secondSubTitle}
                  isImageLeft={post.isImageLeft}
                  key={index}
                  id={post._id}
                />
              ))}
            </div>
          </div>
        </div>
        <SectionDivider
          title={"Перейти к каталогу"}
          subtitle={
            "This section uses a container element to ensure the content looks right on every device. It’s centered with the class “Centered Container.”"
          }
          button={"Вперед"}
        />
        <div className='wrapper'>
          <NewDrop />
          <MainCard
            image={card}
            title={"Свечи из натурального соевого воска с древесным фитилем"}
            subTitle={
              "Интерьерная ароматическая свеча ручной работы, выполнена из чистого пчелиного воска без примесей. 100% экологически чистый продукт. "
            }
            secondSubTitle={
              "Горение свечи способствует восстановлению и снятию стресса. Прекрасно дополнит атмосферу уютного вечера, создаст романтическую обстановку, подойдет для медитаций. Сделано с любовью к окружающему миру. Eco friendly. Состав: Пчелиный воск — 95%, ароматизатор — Роза и мёд"
            }
            isImageLeft={true}
          />
          <SpecialOffer />
          <div className='faq'>
            <div className='faq__card'>
              <div className='faq__logo'>
                <Help />
              </div>
              <div className='faq__text'>
                <div className='faq__title'>Вопросы-ответы</div>
                <div className='faq__subtitle'>
                  Все о проекте, доставке и прочем
                </div>
              </div>
            </div>
            <div className='faq__card faq__active'>
              <div className='faq__logo'>
                <Help />
              </div>
              <div className='faq__text'>
                <div className='faq__title'>Как сделать заказ?</div>
                <div className='faq__subtitle'>
                  Подробная инструкция для клиентов
                </div>
              </div>
            </div>
            <div className='faq__card'>
              <div className='faq__logo'>
                <Help />
              </div>
              <div className='faq__text'>
                <div className='faq__title'>Как сделать возврат?</div>
                <div className='faq__subtitle'>
                  Подробная инструкция для клиентов
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='deviders'>
          <SectionDivider
            title={"Сегментация рынка как целевая аудитория"}
            subtitle={"Подпишитесь на рассылку, чтобы быть в курсе новинок! "}
            button={"Подробнее"}
            bg={"rgba(0, 0, 0, 0.8)"}
            white={true}
            style={{ marginTop: "0", marginBottom: "0", height: "378px" }}
          />
          <SectionDivider
            title={"Рассылка"}
            subtitle={"Подпишитесь на рассылку, чтобы быть в курсе новинок! "}
            button={<input />}
            bg={"rgba(255, 255, 255, 0.8)"}
            style={{ marginTop: "0", marginBottom: "0", height: "378px" }}
            white={false}
          />
        </div>
      </div>
      <ContactForm />
    </>
  );
};
