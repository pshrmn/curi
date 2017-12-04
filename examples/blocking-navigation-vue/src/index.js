import Vue from 'vue';
import Browser from '@hickory/browser';
import { installCuri } from '@curi/vue';
import createConfig from '@curi/core';

import App from './components/App';
import routes from './routes';

const history = Browser();
const config = createConfig(history, routes);

installCuri(Vue, config);
config.respond(response => {
  const vm = new Vue({
    el: '#root',
    data: { response },
    template: '<app />',
    components: { app: App }
  });
}, { once: true });
