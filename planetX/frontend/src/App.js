"use Client";

import axios from 'axios';
import './App.css';

import React, { useEffect, useState } from 'react';

function App() {
  const[message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/api/hello')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
      });
  }, []);

  return (
    <div>
      {console.log('Rendering App component', {message})}
      <h1>{message}</h1>
    </div>
  )
}

export default App;
