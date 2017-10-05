import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Contact',
    path: 'contact',
    body: () => Contact
  },
  {
    name: 'Not Found',
    path: '(.*)',
    body: () => NotFound
  }
];
