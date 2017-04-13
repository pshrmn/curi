import path from 'curi/lib/path';

import store from './store';

export default [
  {
    name: 'Home',
    path: path('', { end: true }),
    preload: () => {
      return import('./components/Home.js')
        .then(home => {
          store.register('Home', home.default)
        });
    },
    call: () => store.get('Home')
  },
  {
    name: 'Contact',
    path: path('contact'),
    preload: () => {
      return import('./components/Contact.js')
        .then(contact => {
          store.register('Contact', contact.default)
        });
    },
    call: () => store.get('Contact')
  }
];
