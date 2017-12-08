import Home from '../components/Home';
import About from '../components/About';
import NotFound from '../components/NotFound';

export default [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    },
  },
  {
    name: 'About',
    path: 'about',
    match: {
      response: ({ set }) => {
        set.body(About);
      }
    },
  },
  {
    name: 'Not Found',
    path: '(.*)',
    match: {
      response: ({ set }) => {
        set.body(NotFound);
      }
    },
  }
];
