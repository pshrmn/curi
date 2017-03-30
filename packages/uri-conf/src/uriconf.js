import uri from './uri';
import updateID from './utils/updateID';
import walk from './utils/walk';
import DEFAULT_ADDONS from './addons/defaults';

const URIConf = (history, initialUris, addons = DEFAULT_ADDONS) => {
  let uris = [];
  const globals = {};

  const setup = newUris => {
    if (!Array.isArray(newUris)) {
      newUris = [ newUris ];
    }
    uris = newUris;

    addons.forEach(addon => {
      globals[addon.name] = addon.get;
      addon.reset()
      // this could be rewritten to only walk the tree once, but
      // setup should not be run very often, so it wouldn't be a big win
      walk(uris, addon.register);
    });
  };

  setup(initialUris);

  let currentUpdate;
  const update = () => {
    const pathname = history.location.pathname;
    // the matched uris
    const matches = {};
    // any promises from matched uris
    const awaiting = [];
    const registerPromise = p => {
      awaiting.push(p);
    };

    const hasMatch = uris.some(uri => {
      return uri.match(pathname, matches, registerPromise)
    });

    // track updates
    const thisUpdate = updateID();
    currentUpdate = thisUpdate;

    if (awaiting.length) {
      Promise.all(awaiting).then(() => {
        // skip if there is a newer update
        if (currentUpdate === thisUpdate) {
          emit(matches);
        }
      });
    } else {
      emit(matches);
    }
  };

  const unlisten = history.listen(update);

  const subscribers = [];
  const subscribe = (fn) => {
    const newLength = subscribers.push(fn);
    return () => {
      subscribers[newLength-1] = null
    };
  };

  const emit = (info) => {
    subscribers.forEach(fn => {
      if (fn != null) {
        fn(info);
      }
    });
  };

  return {
    refresh: setup,
    subscribe,
    addons: globals
  }
}

export default URIConf;
