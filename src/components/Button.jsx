import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, disabled }) {
  return (
    <button
      type="submit"
      className={`w-full p-2 bg-indigo-600 text-white rounded-md${
        disabled ? ' opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.any,
};
