import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Hash } from 'hickory';
import createConfig from 'curi'
import { Navigator } from 'curi-react';

import store from './reduxStuff';
import routes from './routes';
import renderFunction from './renderFunction';

const history = Hash();
const config = createConfig(history, routes);

ReactDOM.render((
  <Provider store={store}>
    <Navigator config={config} children={renderFunction} />
  </Provider>
), document.getElementById('root'));
