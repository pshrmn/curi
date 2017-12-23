import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import createConfig from '@curi/core'
import { CuriBase } from '@curi/react';
import { parse, stringify } from 'qs';

import routes from './routes';
import renderFunction from './renderFunction';

const history = Browser({
  query: { parse, stringify }
});
const config = createConfig(history, routes);
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
