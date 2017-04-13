import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import createConfig from 'curi/lib/createConfig';
import Navigator from 'curi-react/lib/Navigator';

import routes from './routes';
import renderFunction from './renderFunction';

const history = createBrowserHistory();
const config = createConfig(history, routes);

config.ready()
  .then(() => {
    ReactDOM.render((
      <Navigator config={config} children={renderFunction} />
    ), document.getElementById('root'));
  });
