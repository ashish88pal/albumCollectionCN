import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <SnackbarProvider   anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
