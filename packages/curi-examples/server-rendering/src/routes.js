const store = {};

export default [
  {
    name: 'Home',
    path: '',
    preload: () => {
      return import('./components/Home.js')
        .then(module => {
          store['Home'] = module.default;
        });
    },
    call: () => store['Home']
  },
  {
    name: 'Contact',
    path: 'contact',
    preload: () => {
      return import('./components/Contact.js')
        .then(module => {
          store['Contact'] = module.default;
        });
    },
    call: () => store['Contact'],
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        preload: () => {
          return import('./components/Method.js')
            .then(module => {
              store['Contact Method'] = module.default;
            });
        },
        call: () => store['Contact Method']
      }
    ]
  }
];
