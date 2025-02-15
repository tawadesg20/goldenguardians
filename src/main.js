import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure correct ReactDOM version
import App from './App'; // Ensure the path is correct

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(React.StrictMode, null, React.createElement(App))
);
