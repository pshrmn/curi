import Home from './components/Home.html';
import Contact from './components/Contact.html';
import Method from './components/Method.html';
import NotFound from './components/NotFound.html';

const routes = [
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
    },
    children: [
      {
        name: 'Method',
        path: ':method',
        match: {
          response: ({ set }) => {
            set.body(Method);
          }
        }
      }
    ]
  },
  {
    name: 'NotFound',
    path: '(.*)',
    match: {
      response: ({ set }) => {
        set.body(NotFound);
      }
    }
  }
];

export default routes;
