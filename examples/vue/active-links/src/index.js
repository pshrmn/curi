import Vue from 'vue';
import Browser from '@hickory/browser';
import curi from '@curi/core';
import { installCuri } from '@curi/vue';
import createActiveAddon from '@curi/addon-active';

import routes from './routes';
import App from './components/App';

const history = Browser();

const router = curi(history, routes, {
  addons: [createActiveAddon()]
});
installCuri(Vue, router);

router.respond((response, action) => {
  const vm = new Vue({
    el: '#root',
    template: '<app />',
    components: { app: App }
  });
}, { once: true });
