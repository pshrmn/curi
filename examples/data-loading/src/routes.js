import dataCache from './dataCache';
import fakeAPI from './fakeAPI';

import Home from './components/Home';
import Album from './components/Album';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Album',
    path: 'a/:id',
    body: () => Album,
    load: ({ params }, mods) => {
      const { id } = params
      // don't re-fetch data
      const existing = dataCache.get(id);
      if (existing) {
        mods.setData(existing);
        return Promise.resolve(existing);
      }
      return fakeAPI(id)
        .then(data => {
          mods.setData(data);
          dataCache.set(id, data);
        })
        .catch(err => {
          mods.setStatus(404);
        });
    }
  }
];
