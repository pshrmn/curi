export default [
  { name: 'Home', path: '', value: 'home'},
  { name: 'Contact', path: 'contact', value: 'contact', children: [
    { name: 'Method', path: ':method', value: 'contact-method' }
  ]}
];
