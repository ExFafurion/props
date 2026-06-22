// src/App.tsx
import React from 'react';
import Listing from './components/Listing';
import etsyData from './data/etsy.json';
import './App.css';

function App() {
  return (
    <div className="App">
      <Listing items={etsyData} />
    </div>
  );
}

export default App;