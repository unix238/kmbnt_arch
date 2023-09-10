import React from 'react';
import cl from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = React.useState(0);

  const moveNext = () => {
    setCurrentImage(currentImage < images.length - 1 ? currentImage + 1 : 0);
  };

  const movePrev = () => {
    setCurrentImage(currentImage > 0 ? currentImage - 1 : images.length - 1);
  };

  return (
    <div className={cl.image__galery}>
      <div className={cl.thumbnails}>
        <div className={cl.arrow__top} onClick={movePrev}>
          <svg
            width='22'
            height='22'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.99992 1.5C9.06742 1.5 9.12742 1.5075 9.18742 1.53C9.22492 1.53 9.25492 1.545 9.29242 1.56C9.38242 1.5975 9.46492 1.65 9.53242 1.7175L12.5324 4.7175C12.6749 4.8675 12.7499 5.055 12.7499 5.25C12.7499 5.445 12.6749 5.6325 12.5324 5.7825C12.2399 6.075 11.7599 6.075 11.4674 5.7825L9.74992 4.0575L9.74992 15.75C9.74992 16.1625 9.41242 16.5 8.99992 16.5C8.58742 16.5 8.24992 16.1625 8.24992 15.75L8.24992 4.0575L6.53242 5.7825C6.23992 6.075 5.75992 6.075 5.46742 5.7825C5.17492 5.49 5.17492 5.01 5.46742 4.7175L8.46742 1.7175C8.53492 1.65 8.61742 1.5975 8.70742 1.56C8.74492 1.545 8.77492 1.53 8.81242 1.53C8.87242 1.5075 8.93242 1.5 8.99992 1.5Z'
              fill='black'
            />
          </svg>
        </div>
        <div className={cl.thumbnails__block}>
          <div className={cl.thumbnail}>
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentImage(index);
                }}
                className={
                  currentImage != index
                    ? [cl.thumbnail__image, cl.active__thumbnail].join(' ')
                    : cl.thumbnail__image
                }
              >
                dasdasdasd
                {/* <img src={image} alt='thumbnail' id={cl.thumbnail} /> */}
              </div>
            ))}
          </div>
        </div>
        <div className={cl.arrow__bottom} onClick={moveNext}>
          <svg
            width='22'
            height='22'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.00008 16.5C8.93258 16.5 8.87258 16.4925 8.81258 16.47C8.77508 16.47 8.74508 16.455 8.70758 16.44C8.61758 16.4025 8.53508 16.35 8.46758 16.2825L5.46758 13.2825C5.32508 13.1325 5.25008 12.945 5.25008 12.75C5.25008 12.555 5.32508 12.3675 5.46758 12.2175C5.76008 11.925 6.24008 11.925 6.53258 12.2175L8.25008 13.9425L8.25008 2.25C8.25008 1.8375 8.58758 1.5 9.00008 1.5C9.41258 1.5 9.75008 1.8375 9.75008 2.25L9.75008 13.9425L11.4676 12.2175C11.7601 11.925 12.2401 11.925 12.5326 12.2175C12.8251 12.51 12.8251 12.99 12.5326 13.2825L9.53258 16.2825C9.46508 16.35 9.38258 16.4025 9.29258 16.44C9.25508 16.455 9.22508 16.47 9.18758 16.47C9.12758 16.4925 9.06758 16.5 9.00008 16.5Z'
              fill='black'
            />
          </svg>
        </div>
      </div>
      <div className={cl.main__image}>
        <img
          className={cl.main__image__img}
          src={images[currentImage]}
          alt='main image'
        />
      </div>
    </div>
  );
};
