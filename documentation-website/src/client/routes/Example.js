import React from 'react';
import { byName } from '../constants/examples';

let Example;

export default {
  name: 'Example',
  path: ':slug/',
  preload: () => {
    return import(/* webpackChunkName: 'example' */'../route-components/Example')
      .then(module => {
        Example = module.default;
      })
      .catch(err => {
        console.error('Failed to load Example component', err);
        Example = <div>Sorry, something went wrong...</div>;
      })
  },
  load: (params, location, mods) => {
    if (byName[params.slug]) {
      mods.setData(byName[params.slug]);
    }
    return Promise.resolve();
  },
  body: () => Example,
  title: (params, data) => `${data ? data.name : 'Unknown'} Example`
};
