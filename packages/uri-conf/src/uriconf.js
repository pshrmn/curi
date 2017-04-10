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

const URIConf = (history, initialUris, addons = DEFAULT_ADDONS) => {
  // the current uris to match against
  let uris = [];
  // the addons being used by the uriconf
  const globals = {};

  const setup = newUris => {
    if (!Array.isArray(newUris)) {
      newUris = [ newUris ];
    }
    uris = createURIs(newUris);
    addons.forEach(addon => {
      globals[addon.name] = addon.get;
      addon.reset();
      // this could be rewritten to only walk the tree once, but
      // setup should not be run very often, so it wouldn't be a big win
      walk(uris, addon.register);
    });
  };

  let currentUpdate;
  const update = () => {
    const { pathname, key } = history.location;
    currentUpdate = key;

    const resp = new Response(history.location)
    uris.some(uri => { return uri.match(pathname, resp); });
    if (resp.uri) {
      const { preload, load } = resp.uri;
      Promise.all([
        preload ? preload() : null,
        load ? load(resp.params) : null
      ]).then(
        (args) => {
          // don't emit if it has been superseded
          if (currentUpdate === key) {
            resp.call();
            emit(resp);
          }
        },
        (err) => { /* not sure what to do here yet */ }
      );
    } else {
      emit(resp);
    }
  };

  const unlisten = history.listen(update);

  const subscribers = [];
  let lastUpdate;
  const subscribe = (fn) => {
    if (lastUpdate && fn != null) {
      fn(lastUpdate);
    }
    const newLength = subscribers.push(fn);
    return () => {
      subscribers[newLength-1] = null
    };
  };

  const emit = (response) => {
    lastUpdate = response;
    subscribers.forEach(fn => {
      if (fn != null) {
        fn(response);
      }
    });
  };

  setup(initialUris);
  update();

  return {
    refresh: setup,
    subscribe,
    addons: globals,
    history
  }
}

export default URIConf;
