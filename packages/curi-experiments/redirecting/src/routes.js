import path, { parentPath } from 'curi/lib/path';

import Home from './components/Home';
import Protected from './components/Protected';
import Login from './components/Login';
import Logout from './components/Logout';

import fakeAuth from './fakeAuth';

export default [
  {
    name: 'Home',
    path: path(''),
    value: Home
  },
  {
    name: 'Protected',
    path: path('protected'),
    value: Protected,
    load: (resp) => {
      if (!fakeAuth.authenticated()) {
        resp.redirect('/login?next=/protected', 302);
      }
    }
  },
  {
    name: 'Login',
    path: path('login'),
    value: Login
  },
  {
    name: 'Logout',
    path: path('logout'),
    value: Logout
  }
]
