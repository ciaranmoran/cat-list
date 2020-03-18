import React from 'react';
import PropTypes from 'prop-types';

const usePeopleContext = () => {
  const [people, setPeople] = React.useState([]);
  const [error, setError] = React.useState(null);

  return {
    people,
    setPeople,
    error,
    setError,
  };
};

export const PeopleCtx = React.createContext({});

export default function PeopleContext({ children }) {
  return (
    <PeopleCtx.Provider value={{ ...usePeopleContext() }}>
      {children}
    </PeopleCtx.Provider>
  );
}

PeopleContext.propTypes = {
  children: PropTypes.node.isRequired,
};
