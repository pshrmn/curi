import ComponentStore from 'curi-react/lib/ComponentStore';

const store = ComponentStore();

export default [
  {
    name: 'Home',
    path: '',
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
    path: 'contact',
    preload: () => {
      return import('./components/Contact.js')
        .then(contact => {
          store.register('Contact', contact.default)
        });
    },
    call: () => store.get('Contact')
  }
];
