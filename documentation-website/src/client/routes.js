import React from 'react';

// components that are not code split
import Home from './route-components/Home';
import PackageList from './route-components/PackageList';
import ExampleList from './route-components/ExampleList';

import { byName as tutorialsByName } from './constants/tutorials';
import { byName as guidesByName } from './constants/guides';
import { byName as packagesByName } from './constants/packages';
import { byName as examplesByName } from './constants/examples';

const loadedModules = {};

function handleImport(name) {
  return {
    loaded: module => {
      loadedModules[name] = module.default;
    },
    caught: err => {
      console.error('Failed to load module for:', name, err);
      loadedModules[name] = () => <div>Sorry, something went wrong...</div>;
    }
  }
}

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home,
    title: 'Curi'
  },
  {
    name: 'Tutorial',
    path: 'tutorial/:name',
    preload: () => {
      const { loaded, caught } = handleImport('Tutorial');
      return import(/* webpackChunkName: 'tutorial' */'./route-components/Tutorial')
        .then(loaded)
        .catch(caught);
    },
    body: () => loadedModules["Tutorial"],
    title: ({ name }) => {
      const data = tutorialsByName[name];
      return !data ? 'Tutorial Not Found' : `Tutorial ${data.displayName}`;
    }
  },
  {
    name: 'Guide',
    path: 'guides/:slug/',
    preload: () => {
      const { loaded, caught } = handleImport('Guide');
      return import(/* webpackChunkName: 'guide' */'./route-components/Guide')
        .then(loaded)
        .catch(caught);
    },
    load: ({ params }, mods) => {
      if (guidesByName[params.slug]) {
        mods.setData(guidesByName[params.slug]);
      }
      return Promise.resolve();
    },
    body: () => loadedModules["Guide"],
    title: (params, data) => `${data ? data.name : 'Unknown'} Guide`
  },
  {
    name: 'Packages',
    path: 'packages',
    body: () => PackageList,
    title: 'Curi Packages',
    children: [
      {
        name: 'Package',
        path: '@curi/:package/',
        preload: () => {
          const { loaded, caught } = handleImport('Package');
          return import(/* webpackChunkName: 'package' */'./route-components/Package')
            .then(loaded)
            .catch(caught);
        },
        load: ({ params }, mods) => {
          if (packagesByName[params.package]) {
            mods.setData(packagesByName[params.package]);
          }
          return Promise.resolve();
        },
        body: () => loadedModules["Package"],
        title: (params) => `@curi/${params.package}`
      }
    ]
  },
  {
    name: 'Examples',
    path: 'examples',
    body: () => ExampleList,
    title: 'Examples',
    children: [
      {
        name: 'Example',
        path: ':slug/',
        preload: () => {
          const { loaded, caught } = handleImport('Example');
          return import(/* webpackChunkName: 'example' */'./route-components/Example')
            .then(loaded)
            .catch(caught);
        },
        load: ({ params }, mods) => {
          if (examplesByName[params.slug]) {
            mods.setData(examplesByName[params.slug]);
          }
          return Promise.resolve();
        },
        body: () => loadedModules["Example"],
        title: (params, data) => `${data ? data.name : 'Unknown'} Example`
      }
    ]
  }
];
