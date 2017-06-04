import All from './components/All';

export default [
  {
    name: 'All',
    path: ':all*',
    body: () => All
  }
]