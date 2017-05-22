import Vue from 'vue';
import Link from './Link';
import Redirect from './Redirect';

const CuriPlugin = {

  install: function(Vue, options) {
    Vue.$curi = options.config;
    Vue.component(Link.name, Link);
    Vue.component(Redirect.name, Redirect);
  }
};

export default CuriPlugin;
