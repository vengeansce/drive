import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ id, label, ...rest }) {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-1 text-gray-700 text-base font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-md border border-gray-400 px-2 py-1 mb-6"
        {...rest}
      />
    </>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
};
