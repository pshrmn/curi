import React from 'react';
import ReactDOM from 'react-dom';
import { Browser } from 'hickory';
import createConfig from 'curi';
import { Navigator } from 'curi-react';

import routes from './routes';
import renderFunction from './renderFunction';

const history = Browser();
const config = createConfig(history, routes);

config.ready()
  .then((response) => {
    ReactDOM.render((
      <Navigator config={config} children={renderFunction} />
    ), document.getElementById('root'));
  });
