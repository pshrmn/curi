import Home from './components/Home.html';
import Contact from './components/Contact.html';
import Method from './components/Method.html';
import NotFound from './components/NotFound.html';

const routes = [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Contact',
    path: 'contact',
    body: () => Contact,
    children: [
      {
        name: 'Method',
        path: ':method',
        body: () => Method
      }
    ]
  },
  {
    name: 'NotFound',
    path: '(.*)',
    body: () => NotFound
  }
];

export default routes;
