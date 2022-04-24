import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

