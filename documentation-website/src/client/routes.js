import React from 'react';

// components that are not code split
import Home from './route-components/Home';
import PackageList from './route-components/PackageList';
import ExampleList from './route-components/ExampleList';

import { byName as tutorialsByName } from './constants/tutorials';
import { byName as guidesByName } from './constants/guides';
import { byName as packagesByName } from './constants/packages';
import EXAMPLES from './constants/examples';

function caught(error) {
  console.error('Failed to load module for:', name, err);
  return () => <div>Sorry, something went wrong...</div>;
}

export default [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        set.body(Home);
        set.title('Curi');
      }
    }
  },
  {
    name: 'Tutorial',
    path: 'tutorial/:name',
    match: {
      initial: () =>
        import(/* webpackChunkName: 'tutorial' */ './route-components/Tutorial').then(
          module => module.default,
          caught
        ),
      response: ({ route, resolved, set }) => {
        set.body(resolved.initial);
        const tutorial = tutorialsByName[route.params.name];
        if (tutorial) {
          set.title(`Tutorial ${tutorial.displayName}`);
        }
      }
    }
  },
  {
    name: 'Guide',
    path: 'guides/:slug/',
    match: {
      initial: () =>
        import(/* webpackChunkName: 'guide' */ './route-components/Guide').then(
          module => module.default,
          caught
        ),
      response: ({ route, resolved, set }) => {
        set.body(resolved.initial);
        const guide = guidesByName[route.params.slug];
        if (guide) {
          set.data(guide);
          set.title(`${guide.name} Guide`);
        }
      }
    }
  },
  {
    name: 'Packages',
    path: 'packages',
    match: {
      response: ({ set }) => {
        set.body(PackageList);
        set.title('Curi Packages');
      }
    },
    children: [
      {
        name: 'Package',
        path: '@curi/:package/',
        match: {
          initial: () =>
            import(/* webpackChunkName: 'package' */ './route-components/Package').then(
              module => module.default,
              caught
            ),
          response: ({ route, resolved, set }) => {
            set.body(resolved.initial);
            const pkg = packagesByName[route.params.package];
            set.title(`@curi/${route.params.package}`);
            if (pkg) {
              set.data(pkg);
            }
          }
        }
      }
    ]
  },
  {
    name: 'Examples',
    path: 'examples',
    match: {
      response: ({ set }) => {
        set.body(ExampleList);
        set.title('Examples');
      }
    },
    children: [
      {
        name: 'Example',
        path: ':category/:slug/',
        match: {
          initial: () =>
            import(/* webpackChunkName: 'example' */ './route-components/Example').then(
              module => module.default,
              caught
            ),
          response: ({ route, resolved, set }) => {
            set.body(resolved.initial);
            const { category, slug } = route.params;
            const example = EXAMPLES.find(category, slug);
            if (example) {
              set.data(example);
              set.title(`${example.name} Example`);
            }
          }
        }
      }
    ]
  }
];
