import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Select } from '../Select/Select';
import { ItemCard } from '../ItemCard/ItemCard';
import cl from './WishList.module.css';
import { Loader } from '../Loader/Loader';
import ServiceApi from '../../../api/ServiceApi';
import { useSelector } from 'react-redux';

export const WishList = () => {
  const [wishItems, setWishItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const favorites = useSelector((state) => state.toolkit.favorite);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div className='items'>
        {favorites.length > 0 ? (
          !isLoading ? (
            favorites.map((item) => {
              return <ItemCard key={`${item._id}ws`} item={item} />;
            })
          ) : (
            <Loader />
          )
        ) : (
          <div className='center__title'>Тут пусто :(</div>
        )}
      </div>
    </div>
  );
};
