import uri from './uri';
import walk from './utils/walk';
import DEFAULT_ADDONS from './addons/defaults';
import Response from './response';

const URIConf = (history, initialUris, addons = DEFAULT_ADDONS) => {
  // the current uris to match against
  let uris = [];
  // the addons being used by the uriconf
  const globals = {};

  const setup = newUris => {
    if (!Array.isArray(newUris)) {
      newUris = [ newUris ];
    }
    uris = newUris;

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
    // any promises from matched uris
    const awaiting = [];
    const registerPromise = p => {
      awaiting.push(p);
    };

    const hasMatch = uris.some(uri => {
      return uri.match(pathname, resp, registerPromise)
    });

    if (awaiting.length) {
      Promise.all(awaiting).then(() => {
        // skip if there is a newer update
        if (currentUpdate === key) {

          emit(resp);
        }
      });
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

  const emit = (info) => {
    lastUpdate = info;
    subscribers.forEach(fn => {
      if (fn != null) {
        fn(info);
      }
    });
  };

  const getMatches = (key) => matches[key]

  setup(initialUris);
  update();

  return {
    refresh: setup,
    subscribe,
    getMatches,
    addons: globals,
    history
  }
}

export default URIConf;
