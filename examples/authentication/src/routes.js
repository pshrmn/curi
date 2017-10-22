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
    load: (route, mods, addons) => {
      if (!fakeAuth.authenticated()) {
        mods.redirect({
          pathname: addons.pathname('Login'),
          query: { next: '/protected' }
        }, 302);
      }
    }
  },
  {
    name: 'Login',
    path: 'login',
    body: () => Login,
    load: (route, mods) => {
      if (fakeAuth.authenticated()) {
        mods.redirect({
          pathname: addons.pathname('Home')
        });
      }
    }
  },
  {
    name: 'Logout',
    path: 'logout',
    body: () => Logout,
    load: (route, mods) => {
      if (!fakeAuth.authenticated()) {
        mods.redirect({
          pathname: addons.pathname('Home')
        });
      }
    }
  }
]
