import React from "react";
import { PrismBlock } from "../PrismBlocks";

const VueBanner = () => (
  <PrismBlock lang="javascript">
    {`import Vue from 'vue';

import Browser from '@hickory/browser';
import { CuriPlugin } from '@curi/vue';
import curi from '@curi/core';
import App from './components/App';

const history = Browser();
const routes = [...];
const router = curi(history, routes);

// install the CuriPlugin on your Vue instance
Vue.use(CuriPlugin, { router });

// use a one-time response handler to wait for
// the initial response
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
