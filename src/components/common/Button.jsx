import React from 'react';
import './Button.css';

const Button = ({ 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  onClick,
  disabled = false,
  className = '' 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant} ${fullWidth ? 'button-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;