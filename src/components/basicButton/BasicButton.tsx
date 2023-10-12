import React, { FC } from 'react';
import './BasicButton.css';
import cn from 'clsx';

interface BasicButtonProps {
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// eslint-disable-next-line react/prop-types
export const BasicButton: FC<BasicButtonProps> = ({ text, className = '', onClick }) => {
  return (
    <div className="basket-button__div">
      <button className={cn('in-basket', className)} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
