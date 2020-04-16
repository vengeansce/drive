import React from 'react';
import PropTypes from 'prop-types';

export default function Table({ children, before }) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col">
      <div>
        {before}
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">{children}</table>
          </div>
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  before: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};
