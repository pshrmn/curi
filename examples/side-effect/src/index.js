import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import createConfig from '@curi/core'
import { Navigator } from '@curi/react';
import createTitleSideEffect from '@curi/side-effect-title';

import routes from './routes';
import renderFunction from './renderFunction';

const setTitle = createTitleSideEffect({ suffix: '| Middleware Example' });
const history = Browser();
const config = createConfig(history, routes, {
  sideEffects: [{ fn: setTitle }]
});
const root = document.getElementById('root');

config.subscribe((response, action) => {
  ReactDOM.render((
    <Navigator
      response={response}
      action={action}
      config={config}
      render={renderFunction}
    />
  ), root);
});
