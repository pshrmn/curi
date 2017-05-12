import dataCache from './dataCache';
import fakeAPI from './fakeAPI';

import Home from './components/Home';
import Album from './components/Album';

export default [
  {
    name: 'Home',
    path: '',
    value: Home
  },
  {
    name: 'Album',
    path: 'a/:id',
    value: Album,
    load: (resp) => {
      const { id } = resp.params
      // don't re-fetch data
      const existing = dataCache.get(id);
      if (existing) {
        resp.setData(existing);
        return Promise.resolve(existing);
      }
      return fakeAPI(id)
        .then(data => {
          resp.setData(data);
          dataCache.set(id, data);
        })
        .catch(err => {
          resp.setStatus(404);
        });
    }
  }
];
