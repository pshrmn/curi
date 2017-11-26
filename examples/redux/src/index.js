import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Browser from '@hickory/browser';
import createConfig from '@curi/core'
import { syncResponses } from '@curi/redux';

import CuriProvider from './components/CuriProvider';
import store from './reduxStuff';
import routes from './routes';
import App from './components/App';

const history = Browser();
const config = createConfig(history, routes);
const root = document.getElementById('root');

syncResponses(store, config);

config.subscribe((response, action) => {
  ReactDOM.render((
    <Provider store={store}>
      <CuriProvider config={config}>
        <App />
      </CuriProvider>
    </Provider>
  ), root);
});
