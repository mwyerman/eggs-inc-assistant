import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

const content = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

render(content, document.getElementById('root'));
