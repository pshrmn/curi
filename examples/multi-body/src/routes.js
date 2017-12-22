import { Home, HomeMenu } from './components/Home';
import { Contact, ContactMenu } from './components/Contact';
import { Method, MethodMenu } from './components/Method';
import { NotFound, NotFoundMenu } from './components/NotFound';

export default [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        set.body({ Main: Home, Menu: HomeMenu });
      }
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    match: {
      response: ({ set }) => {
        set.body({ Main: Contact, Menu: ContactMenu });
      }
    },
    children: [
      {
        name: 'Method',
        path: ':method',
        match: {
          response: ({ set }) => {
            set.body({ Main: Method, Menu: MethodMenu });
          }
        }
      }
    ]
  },
  {
    name: 'Not Found',
    path: '(.*)',
    match: {
      response: ({ set }) => {
        set.body({ Main: NotFound, Menu: NotFoundMenu });
      }
    }
  }
];
