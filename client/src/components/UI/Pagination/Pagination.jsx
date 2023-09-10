import React, { useState } from 'react';
import cl from './Pagination.module.css';
import { ArrowRight } from '../Icons/ArrowRight';

export const Pagination = ({ setPage, totalPages }) => {
  const changePage = (page) => {
    setPage(page);
    setCurrentPage(page);
  };
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className={cl.pagination}>
      <div
        className={cl.arrowLeft}
        onClick={() => {
          if (currentPage > 1) {
            changePage(currentPage - 1);
          }
        }}
      >
        <ArrowRight
          style={{
            transform: 'rotate(180deg)',
          }}
        />
      </div>
      <div className={cl.nums}>
        {totalPages > 5 ? (
          <>
            {Array.from({ length: 3 }, (_, i) => i + 1).map((page, index) => (
              <div
                key={index}
                className={
                  currentPage == index + 1
                    ? [cl.active, cl.page].join(' ')
                    : cl.page
                }
                onClick={() => {
                  changePage(page);
                }}
              >
                {page}
              </div>
            ))}
            <div className={cl.page}>...</div>
            <div
              className={cl.page}
              onClick={() => {
                changePage(totalPages);
              }}
            >
              {totalPages}
            </div>
          </>
        ) : (
          Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page, index) => (
              <div
                key={index}
                className={
                  currentPage == index + 1
                    ? [cl.active, cl.page].join(' ')
                    : cl.page
                }
                onClick={() => {
                  changePage(page);
                }}
              >
                {page}
              </div>
            )
          )
        )}
      </div>

      <div
        className={cl.arrowRight}
        onClick={() => {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setPage(currentPage + 1);
          }
        }}
      >
        <ArrowRight
          style={{
            transform: 'rotate(360deg)',
          }}
        />
      </div>
    </div>
  );
};
