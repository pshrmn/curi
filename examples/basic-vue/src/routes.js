import Home from './components/Home';
import Contact from './components/Contact';
import Method from './components/Method';

export default [
  { name: 'Home', path: '', body: () => Home},
  { name: 'Contact', path: 'contact', body: () => Contact, children: [
    { name: 'Method', path: ':method', body: () => Method }
  ]}
];
