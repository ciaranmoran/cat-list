import React from 'react';
import PropTypes from 'prop-types';
import './ListView.css';

export default function ListView({ items }) {
  return (
    <div className="listview">
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

ListView.propTypes = {
  items: PropTypes.array.isRequired,
};
