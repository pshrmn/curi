import React from 'react';
import { byName } from '../constants/guides';

let Guide;

export default {
  name: 'Guide',
  path: 'guides/:slug/',
  preload: () => {
    return import(/* webpackChunkName: 'guide' */'../route-components/Guide')
      .then(module => {
        Guide = module.default;
      })
      .catch(err => {
        console.error('Failed to load Guide component', err);
        Guide = <div>Sorry, something went wrong...</div>;
      })
  },
  load: (params, rc) => {
    if (byName[params.slug]) {
      rc.setData(byName[params.slug]);
    }
    return Promise.resolve();
  },
  body: () => Guide,
  title: (params, data) => `${data ? data.name : 'Unknown'} Guide`
};
