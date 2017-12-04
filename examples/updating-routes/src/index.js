import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import createConfig from '@curi/core';

import App from './components/App';
import { baseRoutes } from './routes';

const history = Browser();
const config = createConfig(history, baseRoutes);
const root = document.getElementById('root');

config.respond((response, action) => {
  ReactDOM.render((
    <App
      response={response}
      action={action}
      config={config}
    />
  ), root);
});
