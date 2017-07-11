import Guide from '../route-components/Guide';

import { byName } from '../Guides';

export default {
  name: 'Guide',
  path: 'guides/:slug/',
  body: () => Guide,
  title: (params, data) => `${data ? data.name : 'Unknown'} Guide`,
  load: (params, rc) => {
    if (byName[params.slug]) {
      rc.setData(byName[params.slug]);
    }
    return Promise.resolve();
  }
};
