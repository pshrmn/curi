import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import createConfig from 'curi'
import prefetch from 'curi-addon-prefetch';
import { Navigator } from 'curi-react';

import routes from './routes';
import renderFunction from './renderFunction';

const history = createHashHistory();

const config = createConfig(history, routes, { addons: [prefetch] });

config.ready()
  .then(() => {
    ReactDOM.render((
      <Navigator config={config} children={renderFunction} />
    ), document.getElementById('root'));    
  });
