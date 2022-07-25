import React from 'react';
import ReactDOM from 'react-dom/client';
import SnackbarProvider from 'react-simple-snackbar';

import './global.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </React.StrictMode>
);

reportWebVitals();
