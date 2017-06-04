import Home from './components/Home';
import Contact from './components/Contact';

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
  }
];
