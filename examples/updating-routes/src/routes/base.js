import Home from '../components/Home';
import About from '../components/About';
import NotFound from '../components/NotFound';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'About',
    path: 'about',
    body: () => About
  },
  {
    name: 'Not Found',
    path: '(.*)',
    body: () => NotFound
  }
];
