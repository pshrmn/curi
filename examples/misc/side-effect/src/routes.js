import Home from './components/Home';
import Contact from './components/Contact';
import Method from './components/Method';

export default [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        set.body(Home);
        set.title('Home');
      }
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    match: {
      response: ({ set }) => {
        set.body(Contact);
        set.title('Contact');
      }
    },
    children: [
      {
        name: 'Method',
        path: ':method',
        match: {
          response: ({ route, set }) => {
            set.body(Method);
            set.title(`Contact via ${route.params.method}`);
          }
        }
      }
    ]
  }
]