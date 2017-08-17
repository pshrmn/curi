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
    load: (params, location, respCreator) => {
      const { id } = params
      // don't re-fetch data
      const existing = dataCache.get(id);
      if (existing) {
        respCreator.setData(existing);
        return Promise.resolve(existing);
      }
      return fakeAPI(id)
        .then(data => {
          respCreator.setData(data);
          dataCache.set(id, data);
        })
        .catch(err => {
          respCreator.setStatus(404);
        });
    }
  }
];
