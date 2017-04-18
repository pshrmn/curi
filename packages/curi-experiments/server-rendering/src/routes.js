import path, { parentPath } from 'curi/lib/path';
import ComponentStore from 'curi-react/lib/ComponentStore';

const store = ComponentStore();

export default [
  {
    name: 'Home',
    path: path('', { end: true }),
    preload: () => {
      return import('./components/Home.js')
        .then(module => {
          store.register('Home', module.default)
        });
    },
    call: () => store.get('Home')
  },
  {
    name: 'Contact',
    path: parentPath('contact'),
    preload: () => {
      return import('./components/Contact.js')
        .then(module => {
          store.register('Contact', module.default)
        });
    },
    call: () => store.get('Contact'),
    children: [
      {
        name: 'Contact Method',
        path: path(':method'),
        preload: () => {
          return import('./components/Method.js')
            .then(module => {
              store.register('Contact Method', module.default)
            });
        },
        call: () => store.get('Contact Method')
      }
    ]
  }
];
