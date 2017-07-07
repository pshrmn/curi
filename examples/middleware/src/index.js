import React from 'react';
import ReactDOM from 'react-dom';
import { Hash } from 'hickory';
import createConfig from 'curi'
import { Navigator } from 'curi-react';
import createTitleMiddleware from 'curi-middleware-title';

import routes from './routes';
import renderFunction from './renderFunction';

const setTitle = createTitleMiddleware({ suffix: '| Middleware Example' });
const history = Hash();
const config = createConfig(history, routes, {
  middleware: [setTitle]
});

ReactDOM.render((
  <Navigator config={config} children={renderFunction} />
), document.getElementById('root'));    
