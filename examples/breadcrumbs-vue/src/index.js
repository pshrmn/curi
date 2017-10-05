import Vue from 'vue';
import createConfig from '@curi/core';
import CuriPlugin from '@curi/vue';
import Browser from '@hickory/browser';
import createAncestorsAddon from '@curi/addon-ancestors';

import routes from './routes';
import renderFunction from './renderFunction';

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
  const routes = {};
  return {
    name: 'title',
    register: (route) => {
      let { name, extra } = route;
      routes[name] = extra && extra.title;
    },
    get: (name, params) => {
      const titleFn = routes[name];
      return titleFn ? titleFn(params) : name;
    }
  }
}

const history = Browser();
const config = createConfig(history, routes, {
  addons: [createAncestorsAddon, createTitleTextAddon]
});

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
