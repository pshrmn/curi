import PackageList from '../route-components/PackageList';

import packageRoute from './Package';

export default {
  name: 'Packages',
  path: 'packages',
  body: () => PackageList,
  title: 'Curi Packages',
  children: [ packageRoute ]
};
