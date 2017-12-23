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
      }
    },
    title: 'Home'
  },
  {
    name: 'Contact',
    path: 'contact',
    match: {
      response: ({ set }) => {
        set.body(Contact);
      }
    },
    title: 'Contact',
    children: [
      {
        name: 'Method',
        path: ':method',
        match: {
          response: ({ set }) => {
            set.body(Method);
          }
        },
        title: (params) => `Contact via ${params.method}`
      }
    ]
  }
]