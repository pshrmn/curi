import Home from './components/Home';
import Contact from './components/Contact';
import Method from './components/Method';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home,
    title: 'Home'
  },
  {
    name: 'Contact',
    path: 'contact',
    body: () => Contact,
    title: 'Contact',
    children: [
      {
        name: 'Method',
        path: ':method',
        body: () => Method,
        title: (params) => `Contact via ${params.method}`
      }
    ]
  }
]