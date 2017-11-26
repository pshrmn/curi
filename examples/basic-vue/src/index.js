import Vue from 'vue';
import createConfig from '@curi/core';
import CuriPlugin from '@curi/vue';
import Browser from '@hickory/browser';

import routes from './routes';
import App from './components/App';

const history = Browser();
const config = createConfig(history, routes);

Vue.use(CuriPlugin, { config });

let vm;
config.subscribe(response => {
  if (vm) {
    vm.response = response;
  } else {
    vm = new Vue({
      el: '#root',
      data: { response },
      template: '<app :response="response" />',
      components: { app: App }
    });
  }
});
