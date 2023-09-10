import React, { useState, useEffect } from "react";
import ServiceApi from "../api/ServiceApi";
import { Header } from "../components/UI/Header/Header";

export const NewsDetail = () => {
  const [post, setPost] = useState(null);
  const id = window.location.pathname.split("/")[2];
  const loadPost = async () => {
    try {
      const postData = await ServiceApi.getPostById(id);
      console.log(postData);
      setPost(postData);
    } catch (e) {
      alert("Ошибка при загрузке поста");
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <div>
      <Header />
      <div className='wrapper'>
        <div className='postDetailTitle'>{post?.title}</div>
        <div className='postImage'>
          <img src={post?.image} />
        </div>
        <div className='postDetailSub'>{post?.subTitle}</div>
        <div className='postDetailSub'>{post?.secondSubTitle}</div>
        <div className='postDetailFooter'></div>
      </div>
    </div>
  );
};
