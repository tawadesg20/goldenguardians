// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Ensure correct ReactDOM version
// import App from './App'; // Ensure the path is correct

// import './index.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   React.createElement(React.StrictMode, null, React.createElement(App))
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as ReactRouterDOM from "react-router-dom"; // Import everything

import "./index.css";

// Enable React Router v7 future flags if available
if ("unstable_setFutureFlags" in ReactRouterDOM) {
  ReactRouterDOM.unstable_setFutureFlags({
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  React.createElement(React.StrictMode, null, React.createElement(App))
);
