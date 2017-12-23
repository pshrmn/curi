import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import createConfig from '@curi/core'
import { CuriBase } from '@curi/react';
import createTitleSideEffect from '@curi/side-effect-title';

import routes from './routes';
import renderFunction from './renderFunction';

const setTitle = createTitleSideEffect({ suffix: '| Middleware Example' });
const history = Browser();
const config = createConfig(history, routes, {
  sideEffects: [{ fn: setTitle }]
});
const root = document.getElementById('root');

config.respond((response) => {
  ReactDOM.render((
    <CuriBase
      response={response}
      config={config}
      render={renderFunction}
    />
  ), root);
});
