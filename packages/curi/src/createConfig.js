import walkRoutes from './utils/walkRoutes';
import pathnameAddon from './addons/pathname';
import Response from './response';

function createConfig(history, routeArray, options = {}) {
  const { addons = [], middleware = [], cache = false } = options;

  const finalAddons = addons.concat(pathnameAddon);

  let routes = [];
  const globals = {};
  const subscribers = [];

  let mostRecentKey;
  let previousResponse;

  const setup = routeArray => {
    const registerFunctions = [];
    for (let key in globals) {
      delete globals[key];
    }

    finalAddons.forEach(addonFactory => {
      const addon = addonFactory();
      globals[addon.name] = addon.get;
      registerFunctions.push(addon);
    });

    routes = walkRoutes(routeArray, registerFunctions, {});
  };

  const respond = key => {
    const resp = new Response(key, history.location);
    routes.some(uri => uri.match(history.location.pathname, resp));
    return resp;
  };

  const runURILoadFunctions = resp => {
    if (!resp.uri) {
      resp.setStatus(404);
      return Promise.resolve(resp);
    }
    const { preload, load } = resp.uri;

    return Promise.all([
      preload ? preload() : null,
      load ? load(resp) : null
    ])
      .catch(err => {
        // when either fails, set the error message
        resp.fail(err);
      })
      .then(() => {
        resp.call();
        return resp;
      })
  };

  const setMostRecentKey = location => {
    let { key } = location;
    if (key == null) {
      key = Math.random().toString(36).slice(2, 8);
    }
    mostRecentKey = key;
    return key;
  };

  const prepareResponse = () => {
    const responseKey = setMostRecentKey(history.location);

    if (cache) {
      const resp = cache.get(history.location);
      if (resp != null) {
        return Promise.resolve(resp);
      }
    }

    const response = respond(responseKey);
    return runURILoadFunctions(response).then(resp => {
      const respObject = middleware.length
        ? middleware.reduce((obj, curr) => curr(obj), resp.asObject())
        : resp.asObject();

      if (cache) {
        cache.set(resp);
      }
      previousResponse = respObject;
      return respObject;
    });
  };

  const subscribe = fn => {
    if (typeof fn !== 'function') {
      throw new Error('The argument passed to subscribe must be a function');
    }

    if (previousResponse) {
      fn(previousResponse);
    }

    const newLength = subscribers.push(fn);
    return () => {
      subscribers[newLength - 1] = null;
    };
  };

  const emit = response => {
    // don't emit old responses
    if (response.key !== mostRecentKey) {
      return;
    }
    subscribers.forEach(fn => {
      if (fn != null) {
        fn(response);
      }
    });
  };

  const ready = () =>
    (previousResponse ? Promise.resolve(previousResponse) : prepareResponse());

  // now that everything is defined, actually do the setup
  setup(routeArray);
  const unlisten = history.listen(() => {
    prepareResponse().then(resp => {
      emit(resp);
    });
  });

  return {
    ready,
    refresh: setup,
    subscribe,
    addons: globals,
    history
  };
}

export default createConfig;
