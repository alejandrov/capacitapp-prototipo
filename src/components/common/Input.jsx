import React from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  icon,
  disabled = false,
  className = '',
  rightElement = null
}) => {
  return (
    <div className={`input-wrapper ${error ? 'input-error' : ''} ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-field ${icon ? 'has-icon' : ''} ${rightElement ? 'has-right-element' : ''}`}
        />
        {rightElement && <div className="input-right-element">{rightElement}</div>}
      </div>
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

export default Input;