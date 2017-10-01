import Admin from '../components/Admin';
import routes from './base';

export default [
  {
    name: 'Admin',
    path: 'admin',
    body: () => Admin
  },
  ...routes
];
