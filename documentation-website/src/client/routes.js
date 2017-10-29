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
      return import(/* webpackChunkName: 'tutorial' */'./route-components/Tutorial')
        .then(module => {
          loadedModules["Tutorial"] = module.default;
        })
        .catch(err => {
          console.error('Failed to load Tutorial component', err);
          loadedModules["Tutorial"] = <div>Sorry, something went wrong...</div>;
        })
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
      return import(/* webpackChunkName: 'guide' */'./route-components/Guide')
        .then(module => {
          loadedModules["Guide"] = module.default;
        })
        .catch(err => {
          console.error('Failed to load Guide component', err);
          loadedModules["Guide"] = <div>Sorry, something went wrong...</div>;
        })
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
          return import(/* webpackChunkName: 'package' */'./route-components/Package')
            .then(module => {
              loadedModules["Package"] = module.default;
            })
            .catch(err => {
              console.error('Failed to load Package component', err);
              loadedModules["Package"] = <div>Sorry, something went wrong...</div>;
            })
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
          return import(/* webpackChunkName: 'example' */'./route-components/Example')
            .then(module => {
              loadedModules["Example"] = module.default;
            })
            .catch(err => {
              console.error('Failed to load Example component', err);
              loadedModules["Example"] = <div>Sorry, something went wrong...</div>;
            })
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
