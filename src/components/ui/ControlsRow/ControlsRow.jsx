import React from 'react';
import './ControlsRow.scss';

export const ControlsRow = ({ children }) => {
  const items = React.Children.toArray(children).filter(Boolean);
  const cls = ['controls', items.length === 2 ? 'controls--two' : ''].join(' ').trim();
  return <div className={cls}>{items}</div>;
};
