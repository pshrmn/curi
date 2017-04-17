import path, { parentPath } from 'curi/lib/path';

import Home from './components/Home';
import Contact from './components/Contact';

export default [
  {
    name: 'Home',
    path: path(''),
    value: Home
  },
  {
    name: 'Contact',
    path: path('contact'),
    value: Contact
  }
];
