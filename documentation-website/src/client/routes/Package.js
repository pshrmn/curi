import React from 'react';
import { byName } from '../constants/packages';

let Package;

export default {
  name: 'Package',
  path: '@curi/:package/',
  preload: () => {
    return import(/* webpackChunkName: 'package' */'../route-components/Package')
      .then(module => {
        Package = module.default;
      })
      .catch(err => {
        console.error('Failed to load Package component', err);
        Package = <div>Sorry, something went wrong...</div>;
      })
  },
  load: (params, location, mods) => {
    if (byName[params.package]) {
      mods.setData(byName[params.package]);
    }
    return Promise.resolve();
  },
  body: () => Package,
  title: (params) => `@curi/${params.package}`
};
