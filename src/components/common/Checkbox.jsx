import React from 'react';
import './Checkbox.css';

const Checkbox = ({
  id,
  name,
  checked,
  onChange,
  label,
  className = '',
  disabled = false
}) => {
  return (
    <div className={`checkbox-wrapper ${className}`}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="checkbox-input"
          disabled={disabled}
        />
        <span className="checkbox-custom"></span>
        <span className="checkbox-text">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;