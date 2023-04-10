import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from "@aws-amplify/ui-react";

import App from './App';

//styling defined in the UI Library of the Amplify Studio dahboard
import { studioTheme } from "./ui-components";
//styling for the UI components under Amplify UI
import "@aws-amplify/ui-react/styles.css";

import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={studioTheme}>
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
