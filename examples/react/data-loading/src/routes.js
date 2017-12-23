import dataCache from './dataCache';
import fakeAPI from './fakeAPI';

import Home from './components/Home';
import Album from './components/Album';

export default [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: 'Album',
    path: 'a/:id',
    match: {
      every: ({ params }) => {
        const { id } = params
        // don't re-fetch data
        const existing = dataCache.get(id);
        return existing
          ? Promise.resolve(existing)
          : fakeAPI(id)
              .then(data => {
                dataCache.set(id, data);
                return data;
              });
      },
      response: ({ error, resolved, set }) => {
        set.body(Album);
        if (error) {
          set.error(error);
        } else {
          set.data(resolved.every)
        }
      }
    }
  }
];
