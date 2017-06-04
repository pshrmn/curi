import Home from './components/Home';
import Protected from './components/Protected';
import Login from './components/Login';
import Logout from './components/Logout';

import fakeAuth from './fakeAuth';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Protected',
    path: 'protected',
    body: () => Protected,
    load: (params, respCreator) => {
      if (!fakeAuth.authenticated()) {
        respCreator.redirect('/login?next=/protected', 302);
      }
    }
  },
  {
    name: 'Login',
    path: 'login',
    body: () => Login,
    load: (params, respCreator) => {
      if (fakeAuth.authenticated()) {
        respCreator.redirect('/');
      }
    }
  },
  {
    name: 'Logout',
    path: 'logout',
    body: () => Logout,
    load: (params, respCreator) => {
      if (!fakeAuth.authenticated()) {
        respCreator.redirect('/');
      }
    }
  }
]
