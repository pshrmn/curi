import React from 'react';
import { PrismBlock } from '../PrismBlocks';

const VueBanner = () => (
  <PrismBlock lang="javascript">
    {`import Vue from 'vue';

import Browser from '@hickory/browser';
import { installCuri } from '@curi/vue';
import curi from '@curi/core';
import App from './components/App';

// create your history object
const history = Browser();

// define your routes
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  ...
];

// create your Curi router
const router = curi(history, routes);

// install the CuriPlugin to your Vue instance
installCuri(Vue, router);

// use the "once: true" option of router.respond
// for the initial render
router.respond(() => {
  const vm = new Vue({
    el: '#root',
    template: '<app />',
    components: { app: App }
  });
}, { once: true });`}
  </PrismBlock>
);

export default VueBanner;
