import path, { parentPath } from 'curi/src/path';

import Home from './components/Home';
import Contact from './components/Contact';
import Method from './components/Method';

export default [
  {
    name: 'Home',
    path: path(''),
    value: Home
  },
  {
    name: 'Contact',
    path: parentPath('contact'),
    value: Contact,
    children: [
      {
        name: 'Method',
        path: path(':method'),
        value: Method
      }
    ]
  }
]