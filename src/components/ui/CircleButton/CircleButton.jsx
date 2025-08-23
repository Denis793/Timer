import React from 'react';
import './CircleButton.scss';

export const CircleButton = ({ ariaLabel, icon, primary, disabled, onClick, children }) => {
  const cls = ['ctrl-btn', primary ? 'ctrl-btn--primary' : ''].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-label={ariaLabel} disabled={disabled} onClick={onClick}>
      {icon ? <img src={icon} alt="" /> : children}
    </button>
  );
};
