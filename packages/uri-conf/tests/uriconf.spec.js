import URIConf from '../src/uriconf';
import pathname from '../src/addons/pathname';
import uri from '../src/uri';
import path from '../src/path';
import createMemoryHistory from 'history/createMemoryHistory';

const noop = () => {};

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
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        { name: 'Contact', path: path('contact') }
      ];
      const conf = URIConf(history, uris);
      const names = [ 'Home', 'About', 'Contact' ];
      names.forEach(n => {
        expect(pathname.get(n)).toBeDefined();
      });
    });

    it('registers nested uris', () => {
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [
            { name: 'Email', path: path('email') },
            { name: 'Phone', path: path('phone') }
          ]
        }
      ];

      const conf = URIConf(history, uris);
      const names = [ 'Email', 'Phone' ];
      names.forEach(n => {
        expect(pathname.get(n)).toBeDefined();
      });
    });

    it('works when initialURIs isn\'t an array', () => {
      const uris = {
        name: 'Contact',
        path: path('contact'),
        children: [
          { name: 'Email', path: path('email') },
          { name: 'Phone', path: path('phone') }
        ]
      }

      const conf = URIConf(history, uris);
      const names = [ 'Contact', 'Email', 'Phone' ];
      names.forEach(n => {
        expect(pathname.get(n)).toBeDefined();
      });
    });

    it('makes addons available through return object', () => {
      const uris = [
        { name: 'Home', path: path('', { end: true }) }
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
        { name: 'Home', path: path('', { end: true }) }
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
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        { name: 'Contact', path: path('contact') }
      ];
      const conf = URIConf(history, uris);
      
      const spanishURIs = [
        { name: 'Casa', path: path('', { end: true }) },
        { name: 'Acerca De', path: path('acerca-de') },
        { name: 'Contacto', path: path('contacto') }
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
    });
  });

  describe('subscribe', () => {
    it('passes last match when it subscribes', () => {
      const history = createMemoryHistory({
        initialEntries: [ '/contact/phone' ]
      });
      const How = { name: 'How', path: path(':method') };
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [ How ]
        }
      ];

      const conf = URIConf(history, uris);
      conf.subscribe(response => {
        expect(response.uri.name).toBe('How');
        expect(response.partials[0]).toBe('Contact');
      });
    });

    it('notifies subscribers of matching routes when location changes', (done) => {
      const How = { name: 'How', path: path(':method') };
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        { name: 'Contact', path: path('contact'), children: [ How ] }
      ];
      const conf = URIConf(history, uris);
      conf.subscribe(response => {
        expect(response.uri.name).toBe('How');
        expect(response.partials[0]).toBe('Contact');
        expect(response.params.method).toBe('mail');
        done();
      });
      history.push('/contact/mail');
    });

    it('notifies subscribers after promises have resolved', (done) => {
      let promiseResolved = false;
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [
            {
              name: 'How',
              path: path(':method'),
              load: () => {
                promiseResolved = true;
                return Promise.resolve(promiseResolved);
              }
            }
          ]
        }
      ];
      const conf = URIConf(history, uris);
      conf.subscribe(response => {
        expect(promiseResolved).toBe(true);
        done();
      });
      history.push('/contact/phone');
    });

    it('only emits most recent update if another one occurs before emitting', (done) => {
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [
            {
              name: 'How',
              path: path(':method'),
              preload: () => Promise.resolve()
            }
          ]
        }
      ];
      const conf = URIConf(history, uris);
      conf.subscribe(response => {
        expect(response.params.method).toBe('mail');
        done();
      });
      history.push('/contact/phone');
      history.push('/contact/mail');
    });

    it('will only match the first uri (per level) that matches', (done) => {
      const Exact = { name: 'Exact', path: path('exact') };
      const CatchAll = { name: 'Catch All', path: path(':anything') };
      const uris = [ Exact, CatchAll ];
      const history = createMemoryHistory({ initialEntries: [ '/exact' ] });
      const conf = URIConf(history, uris);
      conf.subscribe(response => {
        expect(response.uri.name).toBe('Exact');
        done();
      });
    });

    it('only matches one uri for nested levels', () => {
      const Exact = { name: 'Exact', path: path('exact') };
      const CatchAll = { name: 'Catch All', path: path(':anything') };
      const uris = [
        { name: 'Parent', path: path('parent'), children: [ Exact, CatchAll ] }
      ];
      const history = createMemoryHistory({ initialEntries: [ '/parent/exact' ]});
      const conf = URIConf(history, uris);
      conf.subscribe(response => {
        expect(response.uri.name).toBe('Exact');
      });
    });

    it('passes matched params to load function', (done) => {
      const spy = jest.fn((params) => {
        expect(params.anything).toBe('hello');
      });
      const CatchAll = {
        name: 'Catch All',
        path: path(':anything'),
        load: spy
      };
      const history = createMemoryHistory({ initialEntries: [ '/hello' ]});
      const conf = URIConf(history, [ CatchAll ]);
      expect(spy.mock.calls.length).toBe(1);
      conf.subscribe(done);
    });
  });
});
