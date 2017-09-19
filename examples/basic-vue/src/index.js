import Vue from 'vue';
import createConfig from '@curi/core';
import CuriPlugin from '@curi/vue';
import Browser from '@hickory/browser';
import routes from './routes';
import renderFunction from './renderFunction';

const history = Browser();
const config = createConfig(history, routes);

Vue.use(CuriPlugin, { config });

config.ready().then(response => {
  const vm = new Vue({
    el: '#root',
    data: {
      response
    },
    methods: {
      render: renderFunction
    },
    render: function(h) {
      return this.render(h, this.response);
    }
  });

  config.subscribe(resp => {
    vm.response = resp;
  });
});
