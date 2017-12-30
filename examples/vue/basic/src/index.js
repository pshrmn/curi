import Vue from 'vue';
import curi from '@curi/core';
import { installCuri } from '@curi/vue';
import Browser from '@hickory/browser';

import routes from './routes';
import App from './components/App';

const history = Browser();
const router = curi(history, routes);

installCuri(Vue, router);

router.respond((response, action) => {
  const vm = new Vue({
    el: '#root',
    template: '<app />',
    components: { app: App }
  });
}, { once: true });
