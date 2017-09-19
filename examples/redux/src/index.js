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

config.ready().then(() => {
  syncResponses(store, config);

  ReactDOM.render((
    <Provider store={store}>
      <CuriProvider curi={config}>
        <App />
      </CuriProvider>
    </Provider>
  ), document.getElementById('root'));  
});
