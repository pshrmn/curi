import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Hash from '@hickory/hash';
import createConfig from '@curi/core'
import { Navigator } from '@curi/react';

import store from './reduxStuff';
import routes from './routes';
import renderFunction from './renderFunction';

const history = Hash();
const config = createConfig(history, routes);

ReactDOM.render((
  <Provider store={store}>
    <Navigator config={config} render={renderFunction} />
  </Provider>
), document.getElementById('root'));
