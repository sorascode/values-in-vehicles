import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <footer>
      Also check out{' '}
      <a href="https://text-in-train.vercel.app/" target="_blank" rel="noopener noreferrer">
        Text in Train
      </a>
      ,{' '}
      <a href="https://string-in-ships.vercel.app/" target="_blank" rel="noopener noreferrer">
        String in Ship
      </a>{' '}
      and{' '}
      <a href="https://chars-in-church.vercel.app/" target="_blank" rel="noopener noreferrer">
        Chars in Church
      </a>
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
