import Package from '../route-components/Package';

import { byName } from '../Packages';

export default {
  name: 'Package',
  path: ':package/',
  body: () => Package,
  title: (params) => params.package,
  load: (params, rc) => {
    if (byName[params.package]) {
      rc.setData(byName[params.package]);
    }
    return Promise.resolve();
  }
};
