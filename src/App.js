import React from 'react';
import PeopleContext from './components/context/PeopleContext';
import People from 'components/People';
import './App.css';

function App() {
  return (
    <PeopleContext>
      <People />
    </PeopleContext>
  );
}

export default App;
