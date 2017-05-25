import Vue from 'vue';
import createConfig from 'curi';
import CuriPlugin from 'curi-vue';
import { createHashHistory } from 'history';
import routes from './routes';
import renderFunction from './renderFunction';

const history = createHashHistory();
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
