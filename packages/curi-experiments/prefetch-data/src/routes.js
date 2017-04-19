import dataStore from './dataStore';
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
      const existing = dataStore.get(id);
      if (existing) {
        return Promise.resolve(existing);
      }
      return fakeAPI(id)
        .then(data => {
          dataStore.set(id, data);
        })
        .catch(err => {
          resp.setStatus(404);
        });
    }
  }
];
