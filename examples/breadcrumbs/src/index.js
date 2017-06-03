import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import createConfig from 'curi';
import { Navigator } from 'curi-react';
import createAncestorsAddon from 'curi-addon-ancestors';
import routes from './routes';
import renderFunction from './renderFunction';

/*
 * A simple addon that will enable adding a dynamic title
 * to routes, which can be useful for creating links. This
 * relies on the user adding a "title" property to their routes,
 * which is a function that receives parameters and returns
 * a string. This is most likely route params, but you can pass
 * an object containing any values that you want.
 */
function createTitleAddon() {
  const routes = {};
  return {
    name: 'title',
    register: (route) => {
      let { name, title } = route;
      routes[name] = title;
    },
    get: (name, params) => {
      const titleFn = routes[name];
      return titleFn ? titleFn(params) : name;
    }
  }
}


const history = createHashHistory();

const config = createConfig(history, routes, {
  addons: [createAncestorsAddon, createTitleAddon]
});

ReactDOM.render((
  <Navigator config={config} children={renderFunction} />
), document.getElementById('root'));
