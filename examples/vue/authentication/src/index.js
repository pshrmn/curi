import Vue from 'vue';
import Browser from '@hickory/browser';
import createConfig from '@curi/core'
import { installCuri } from '@curi/vue';
import { parse, stringify } from 'qs';

import routes from './routes';
import store from './store';
import App from './components/App';

const history = Browser({
  query: { parse, stringify }
});
const config = createConfig(history, routes);

installCuri(Vue, config);

config.respond((response, action) => {
  const vm = new Vue({
    el: '#root',
    template: '<app />',
    store,
    components: { app: App }
  });
}, { once: true });
