import walkRoutes from './utils/walkRoutes';
import pathnameAddon from './addons/pathname';
import ResponseCreator from './utils/createResponse';

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
    makeResponse();
  };

  const respond = key => {
    const resp = new ResponseCreator(key, history.location);
    routes.some(route => route.match(history.location.pathname, resp));
    resp.freeze();
    return resp;
  };

  const runURILoadFunctions = resp => {
    if (!resp.route) {
      resp.setStatus(404);
      return Promise.resolve(resp);
    }
    const { preload, load } = resp.route;
    return Promise.all([
      preload ? preload() : null,
      load ? load(resp.params, resp) : null
    ])
      .catch(err => {
        // when either fails, set the error message
        resp.fail(err);
      })
      .then(() => {
        return resp;
      });
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

    // Immediately call subscriber function. If the initial response
    // has not resolved, the subscriber will be passed undefined
    fn(previousResponse);

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
    previousResponse ? Promise.resolve(previousResponse) : prepareResponse();

  // create a response object using the current location and
  // emit it to any subscribed functions
  const makeResponse = () => {
    prepareResponse().then(resp => {
      emit(resp);
    });
  };

  // now that everything is defined, actually do the setup
  setup(routeArray);
  const unlisten = history.listen(makeResponse);

  return {
    ready,
    refresh: setup,
    subscribe,
    addons: globals,
    history
  };
}

export default createConfig;
