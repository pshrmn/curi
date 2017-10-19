import React from 'react';

import { byName } from '../constants/tutorials';

let Tutorial;

export default {
  name: 'Tutorial',
  path: 'tutorial/:name',
  preload: () => {
    return import(/* webpackChunkName: 'tutorial' */'../route-components/Tutorial')
      .then(module => {
        Tutorial = module.default;
      })
      .catch(err => {
        console.error('Failed to load Tutorial component', err);
        Tutorial = <div>Sorry, something went wrong...</div>;
      })
  },
  body: () => Tutorial,
  title: ({ name }) => {
    const data = byName[name];
    return !data ? 'Tutorial Not Found' : `Tutorial ${data.displayName}`;
  }
};
