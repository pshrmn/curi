import React from 'react';
import { PrismBlock } from '../PrismBlocks';

const VueBanner = () => (
  <PrismBlock lang='javascript'>
    {
`import Vue from 'vue';

import Browser from '@hickory/browser';
import CuriPlugin from '@curi/vue';
import createConfig from '@curi/core';
import App from './components/App';

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

// subscribe to the config object with a function
// that will be called whenever the location changes
let vm;
config.subscribe((response, action) => {
  if (!vm) {
    vm = new Vue({
      el: '#root',
      data: { response },
      template: '<app :response="response" />',
      components: { app: App }
    });
  } else {
    vm.resposne = response;
  }
});`
    }
  </PrismBlock>
);

export default VueBanner;
