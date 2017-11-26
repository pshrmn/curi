import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import createConfig from '@curi/core';
import { Navigator } from '@curi/react';
import createTitleSideEffect from '@curi/side-effect-title';
import createScrollSideEffect from '@curi/side-effect-scroll';
import createActiveAddon from '@curi/addon-active';
import routes from './routes';
import renderFunction from './render';

const setTitle = createTitleSideEffect({ suffix: '| Curi Documentation' });
const scrollTo = createScrollSideEffect();

const history = Browser();

const config = createConfig(history, routes, {
  addons: [createActiveAddon()],
  sideEffects: [{ fn: setTitle }, { fn: scrollTo }]
});

config.subscribe((response, action) => {
  ReactDOM.render((
    <Navigator
      response={response}
      action={action}
      config={config}
      render={renderFunction}
    />
  ), document.getElementById('root'));
});
