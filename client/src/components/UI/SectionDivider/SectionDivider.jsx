import React from 'react';
import { Button } from '../Button/Button';

import cl from './SectionDivider.module.css';

export const SectionDivider = ({
  title,
  subtitle,
  button,
  bg,
  white,
  style,
}) => {
  return (
    <div
      className={cl.section__divider}
      style={{
        background: bg ? bg : '#e0e0e0',
        color: white ? '#fff' : '#000',
        ...style,
      }}
    >
      <div className={cl.wrapper}>
        <div className={cl.divider}>
          <div className={cl.divider__title}>{title}</div>
          <div className={cl.divider__subtitle}>{subtitle}</div>
          <Button text={`${button} →`} />
        </div>
      </div>
    </div>
  );
};
