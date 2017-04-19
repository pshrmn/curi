import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { createConfig } from 'curi'
import Navigator from 'curi-react/lib/Navigator';

import store from './reduxStuff';
import routes from './routes';
import renderFunction from './renderFunction';

const history = createHashHistory();
const config = createConfig(history, routes);

config.ready()
  .then(() => {
    ReactDOM.render((
      <Provider store={store}>
        <Navigator config={config} children={renderFunction} />
      </Provider>
    ), document.getElementById('root'));    
  });
