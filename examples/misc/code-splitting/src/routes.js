export default [
  {
    name: 'Home',
    path: '',
    match: {
      initial: () => import('./components/Home.js')
        .then(module => module.default),
      response: ({ resolved, set }) => {
        set.body(resolved.initial);
      }
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    match: {
      initial: () => import('./components/Contact.js')
        .then(module => module.default),
      response: ({ resolved, set }) => {
        set.body(resolved.initial);
      }
    }
  }
];
