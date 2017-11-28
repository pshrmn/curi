import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Browser from '@hickory/browser';
import createConfig from '@curi/core'
import { syncResponses } from '@curi/redux';

import ConnectedNavigator from './components/ConnectedNavigator';
import store from './reduxStuff';
import routes from './routes';
import renderFunction from './renderFunction';

const history = Browser();
const config = createConfig(history, routes);
const root = document.getElementById('root');

syncResponses(store, config);
config.subscribe(() => {
  ReactDOM.render((
    <Provider store={store}>
      <ConnectedNavigator render={renderFunction} />
    </Provider>
  ), root);
}, { once: true });
