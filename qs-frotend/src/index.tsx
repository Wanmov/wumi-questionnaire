import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
