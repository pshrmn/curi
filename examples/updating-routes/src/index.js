import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import createConfig from '@curi/core';

import App from './components/App';
import { baseRoutes } from './routes';

const history = Browser();
const config = createConfig(history, baseRoutes);

config.ready().then(() => {
  ReactDOM.render((
    <App config={config} />
  ), document.getElementById('root'));
});
