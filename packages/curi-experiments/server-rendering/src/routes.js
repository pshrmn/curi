import ComponentStore from 'curi-react/lib/ComponentStore';

const store = ComponentStore();

export default [
  {
    name: 'Home',
    path: '',
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
    path: 'contact',
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
        path: ':method',
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
