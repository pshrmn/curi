import React from 'react';
import ReactDOM from 'react-dom';
import Hash from '@hickory/hash';
import createConfig from '@curi/core';
import { Navigator } from '@curi/react';

import routes from './routes';
import renderFunction from './renderFunction';

const history = Hash();
const config = createConfig(history, routes);

ReactDOM.render((
  <Navigator config={config} render={renderFunction} />
), document.getElementById('root'));
