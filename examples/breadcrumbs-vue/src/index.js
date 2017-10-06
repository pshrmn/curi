import Vue from 'vue';
import createConfig from '@curi/core';
import CuriPlugin from '@curi/vue';
import Browser from '@hickory/browser';
import createAncestorsAddon from '@curi/addon-ancestors';

import App from './components/App';
import routes from './routes';

/*
 * A simple addon that will enable adding a dynamic title
 * to routes, which can be useful for creating links. This
 * relies on the user adding a "title" property to their routes'
 * "extra" property. This should be a function that receives
 * parameters and returns a string. This is most likely route
 * params, but you can pass an object containing any values that 
 * you want.
 */
function createTitleTextAddon() {
  let routes = {};
  return {
    name: 'title',
    register: (route) => {
      let { name, extra } = route;
      routes[name] = extra && extra.title;
    },
    get: (name, params) => {
      const titleFn = routes[name];
      return titleFn ? titleFn(params) : name;
    },
    reset: () => {
      routes = {};
    }
  }
}

const history = Browser();
const config = createConfig(history, routes, {
  addons: [createAncestorsAddon(), createTitleTextAddon()]
});

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
