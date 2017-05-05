import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import createConfig from 'curi'
import { Navigator } from 'curi-react';
import createQueryMiddleware from 'curi-middleware-query';
import { parse } from 'qs';

import routes from './routes';
import renderFunction from './renderFunction';

const queryMiddleware = createQueryMiddleware(parse);
const history = createHashHistory();
const config = createConfig(history, routes, {
  middleware: [queryMiddleware]
});

config.ready()
  .then(() => {
    ReactDOM.render((
      <Navigator config={config} children={renderFunction} />
    ), document.getElementById('root'));    
  });
