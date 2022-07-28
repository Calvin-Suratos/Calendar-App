import React from 'react';
import ReactDOM from 'react-dom';
import App from './_app/App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './_context/AppProvider';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// or for Day.js
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// or for Luxon
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// or for Moment.js
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
      </LocalizationProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
