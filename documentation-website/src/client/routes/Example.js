import Example from '../route-components/Example';

import { byName } from '../Examples';

export default {
  name: 'Example',
  path: ':slug/',
  body: () => Example,
  title: (params, data) => `${data ? data.name : 'Unknown'} Example`,
  load: (params, rc) => {
    if (byName[params.slug]) {
      rc.setData(byName[params.slug]);
    }
    return Promise.resolve();
  }
};
