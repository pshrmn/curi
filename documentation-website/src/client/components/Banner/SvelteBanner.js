import React from 'react';
import { PrismBlock } from '../PrismBlocks';

const SvelteBanner = () => (
  <PrismBlock lang='javascript'>
    {
`import Browser from '@hickory/browser';
import createConfig from '@curi/core';
import { setConfig } from '@curi/svelte';

// create your history object
const history = Browser();

// define your routes
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  ...
];

// create your Curi configuration object
const config = createConfig(history, routes);

// Use setConfig so that the @curi/svelte components
// can interact with the configuration object.
setConfig(config);

let view;
const root = document.getElementById('root');

// subscribe to the config object with a function
// that will be called whenever the location changes
config.respond((response, action) => {
  if (view) {
    view.destroy();
  } else {
    root.innerHTML = '';
  }

  view = new response.body({
    target: root,
    data: { response }
});`
    }
  </PrismBlock>
);

export default SvelteBanner;
