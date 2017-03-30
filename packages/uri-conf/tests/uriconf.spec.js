import URIConf from '../src/uriconf';
import pathname from '../src/addons/pathname';
import uri from '../src/uri';
import path from '../src/path';
import createMemoryHistory from 'history/createMemoryHistory';

describe('URIConf', () => {

  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    pathname.reset();
  });

  describe('constructor', () => {
    // these tests rely on the fact that the pathname generator
    // is a default addon
    it('registers uris', () => {
      const uris = [
        uri('Home', path('', { end: true })),
        uri('About', path('about')),
        uri('Contact', path('contact'))
      ];
      const conf = URIConf(history, uris);
      const names = [ 'Home', 'About', 'Contact' ];
      names.forEach(n => {
        expect(pathname.get(n)).toBeDefined();
      });
    });

    it('registers nested uris', () => {
      const uris = [
        uri('Home', path('', { end: true })),
        uri('About', path('about')),
        uri('Contact', path('contact'), [
          uri('Email', path('email')),
          uri('Phone', path('phone'))
        ])
      ];

      const conf = URIConf(history, uris);
      const names = [ 'Email', 'Phone' ];
      names.forEach(n => {
        expect(pathname.get(n)).toBeDefined();
      });
    });

    it('works when initialURIs isn\'t an array', () => {
      const uris = uri('Contact', path('contact'), [
        uri('Email', path('email')),
        uri('Phone', path('phone'))
      ]);

      const conf = URIConf(history, uris);
      const names = [ 'Contact', 'Email', 'Phone' ];
      names.forEach(n => {
        expect(pathname.get(n)).toBeDefined();
      });
    });

    it('makes addons available through return object', () => {
      const uris = [
        uri('Home', path('', { end: true }))
      ];
      const fakeAddon = {
        name: 'fake',
        register: () => {},
        reset: () => {},
        get: () => {}
      };
      const conf = URIConf(history, uris, [ fakeAddon ]);
      expect(conf.addons.fake).toBeDefined();
    });

    it('includes pathname addon by default', () => {
      const uris = [
        uri('Home', path('', { end: true }))
      ];
      const conf = URIConf(history, uris);
      expect(conf.addons.pathname).toBeDefined();
    })
  });

  describe('refresh', () => {
    const err = console.error;

    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = err;
    });

    it('resets and replaces registered uris', () => {
      const uris = [
        uri('Home', path('', { end: true })),
        uri('About', path('about')),
        uri('Contact', path('contact'))
      ];
      const conf = URIConf(history, uris);
      
      const spanishURIs = [
        uri('Casa', path('', { end: true })),
        uri('Acerca De', path('acerca-de')),
        uri('Contacto', path('contacto'))
      ];
      conf.refresh(spanishURIs);

      const englishNames = [ 'Home', 'About', 'Contact' ];
      englishNames.forEach(n => {
        expect(pathname.get(n)).toBeUndefined();
      });

      const spanishNames = [ 'Casa', 'Acerca De', 'Contacto' ];
      spanishNames.forEach(n => {
        expect(pathname.get(n)).toBeDefined();
      });
    })
  });

  describe('emit', () => {
    it('notifies subscribers of matching routes when location changes', () => {
      const uris = [
        uri('Home', path('', { end: true })),
        uri('About', path('about')),
        uri('Contact', path('contact'), [
          uri('How', path(':method'))
        ])
      ];

      const conf = URIConf(history, uris);
      conf.subscribe(info => {
        expect(info['Contact']).toBeDefined();
        expect(info['How']).toBeDefined();
        expect(info['How'].params.method).toBe('mail');
      });
      history.push('/contact/mail');
    });

    it('notifies subscribers after promises have resolved', (done) => {
      let promiseResolved = false;
      const uris = [
        uri('Home', path('', { end: true })),
        uri('About', path('about')),
        uri('Contact', path('contact'), [
          uri('How', path(':method'), undefined, {
            load: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  promiseResolved = true;
                  resolve(true);
                }, 500);
              })
            }
          })
        ])
      ];
      const conf = URIConf(history, uris);
      conf.subscribe(info => {
        expect(promiseResolved).toBe(true);
        done();
      });
      history.push('/contact/phone');
    });

    it('only emits most recent update if another one occurs before emitting', (done) => {
      let promiseResolved = false;
      const uris = [
        uri('Home', path('', { end: true })),
        uri('About', path('about')),
        uri('Contact', path('contact'), [
          uri('How', path(':method'), undefined, {
            preload: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  promiseResolved = true;
                  resolve(true);
                }, 500);
              })
            }
          })
        ])
      ];
      const conf = URIConf(history, uris);
      conf.subscribe(info => {
        expect(info['How'].params.method).toBe('mail');
        done();
      });
      history.push('/contact/phone');
      history.push('/contact/mail');
    });

    it('will only match the first uri (per level) that matches', () => {
      const uris = [
        uri('Exact', path('exact')),
        uri('Catch All', path(':anything'))
      ];

      const conf = URIConf(history, uris);
      conf.subscribe(info => {
        expect(info['Exact']).toBeDefined();
        expect(info['Catch All']).toBeUndefined();
      });
      history.push('exact');
    });
  });
});
