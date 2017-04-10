import uri from './uri';
import walk from './utils/walk';
import DEFAULT_ADDONS from './addons/defaults';
import Response from './response';

function createURIs(uris) {
  return uris.map(obj => {
    const children = obj.children ? createURIs(obj.children) : [];
    return uri({ ...obj, children })
  })
}

function createConfig(history, routes, addons = DEFAULT_ADDONS) {
  // the current uris to match against
  let uris = [];
  // the addons being used by the uriconf
  const globals = {};

  const setup = routes => {
    if (!Array.isArray(routes)) {
      routes = [ routes ];
    }
    uris = createURIs(routes);
    addons.forEach(addonFactory => {
      const addon = addonFactory();

      globals[addon.name] = addon.get;
      addon.reset();
      // this could be rewritten to only walk the tree once, but
      // setup should not be run very often, so it wouldn't be a big win
      walk(uris, addon.register);
    });
  };

  let currentUpdate;

  /*
   * Build a Response object by iterating over the uris
   */
  const respond = () => {
    const { pathname, key } = history.location;
    currentUpdate = key;
    const resp = new Response(history.location)
    uris.some(uri => uri.match(pathname, resp));
    return resp;
  }

  /*
   * The response should not be emitted until any preload/load promises
   * have resolved. 
   */
  const runURILoadFunctions = (resp) => {
    if (!resp.uri) {
      return Promise.resolve(resp);
    }
    const { preload, load } = resp.uri;
    return Promise.all([
      preload ? preload() : null,
      load ? load(resp) : null
    ]).then(
      () => {
        resp.call();
        return resp;
      },
      (err) => {
        // not sure what to do here yet
        return Promise.reject(err);
      }
    );
  }

  let lastUpdate;
  const onUpdate = () => {
    const response = respond();
    return runURILoadFunctions(response)
      .then(resp => emit(resp));
  };

  const subscribers = [];  
  const subscribe = (fn) => {
    if (typeof fn !== 'function') {
      throw new Error('The argument passed to subscribe must be a function');
    }

    if (lastUpdate) {
      fn(lastUpdate);
    }

    const newLength = subscribers.push(fn);
    return () => {
      subscribers[newLength-1] = null
    };
  };

  const emit = (response) => {
    // don't emit old responses
    if (response.location.key !== currentUpdate) {
      return;
    }
    lastUpdate = response;
    subscribers.forEach(fn => {
      if (fn != null) {
        fn(response);
      }
    });
  };

  setup(routes);
  const unlisten = history.listen(onUpdate);

  return {
    ready: onUpdate,
    refresh: setup,
    subscribe,
    addons: globals,
    history
  };
}

export default createConfig;
