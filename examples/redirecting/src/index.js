import React from 'react';
import ReactDOM from 'react-dom';
import { Hash } from 'hickory';
import createConfig from 'curi'
import { Navigator } from 'curi-react';
import { parse, stringify } from 'qs';

import routes from './routes';
import renderFunction from './renderFunction';

const history = Hash({
  parse,
  stringify
});
const config = createConfig(history, routes);

ReactDOM.render((
  <Navigator config={config} children={renderFunction} />
), document.getElementById('root'));
