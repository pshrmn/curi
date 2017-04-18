import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import { createConfig } from 'curi'
import pathname from 'curi/lib/addons/pathname';
import prefetch from 'curi/lib/addons/prefetch';
import Navigator from 'curi-react/lib/Navigator';

import routes from './routes';
import renderFunction from './renderFunction';

const history = createHashHistory();

const config = createConfig(history, routes, [pathname, prefetch]);

config.ready()
  .then(() => {
    ReactDOM.render((
      <Navigator config={config} children={renderFunction} />
    ), document.getElementById('root'));    
  });
