import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import createConfig from 'curi';
import { Navigator } from 'curi-react';

import routes from './routes';
import renderFunction from './renderFunction';

const history = createBrowserHistory();
const config = createConfig(history, routes);

config.ready()
  .then((response) => {
    ReactDOM.render((
      <Navigator config={config} children={renderFunction} />
    ), document.getElementById('root'));
  });
