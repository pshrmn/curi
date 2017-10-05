import Vue from 'vue';
import Browser from '@hickory/browser';
import CuriPlugin from '@curi/vue';
import createConfig from '@curi/core';

import App from './components/App';
import routes from './routes';

const history = Browser();
const config = createConfig(history, routes);

Vue.use(CuriPlugin, { config });

config.ready().then(response => {
  const vm = new Vue({
    el: '#root',
    data: {
      response
    },
    template: '<app :response="response" />',
    components: { app: App }
  });

  config.subscribe(resp => {
    vm.response = resp;
  });
});
