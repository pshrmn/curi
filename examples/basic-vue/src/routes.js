import Home from './components/Home';
import Contact from './components/Contact';
import Method from './components/Method';

export default [
  { name: 'Home', path: '', value: Home},
  { name: 'Contact', path: 'contact', value: Contact, children: [
    { name: 'Method', path: ':method', value: Method }
  ]}
];
