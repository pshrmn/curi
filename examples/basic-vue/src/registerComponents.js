import Vue from 'vue';
import * as Components from './components';

Object.keys(Components).forEach(key => {
  const curr = Components[key];
  Vue.component(curr.name, curr);
});
