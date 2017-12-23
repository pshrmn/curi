import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import createConfig from '@curi/core'
import { CuriBase } from '@curi/react';

import routes from './routes';
import renderFunction from './renderFunction';

const history = Browser();
const config = createConfig(history, routes);
const root = document.getElementById('root');

config.respond((response, action) => {
  ReactDOM.render((
    <CuriBase
      response={response}
      action={action}
      config={config}
      render={renderFunction}
    />
  ), root);
});
