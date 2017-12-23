import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

export default [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    match: {
      response: ({ set }) => {
        set.body(Contact);
      }
    }
  },
  {
    name: 'Not Found',
    path: '(.*)',
    match: {
      response: ({ set }) => {
        set.body(NotFound);
      }
    }
  }
];
