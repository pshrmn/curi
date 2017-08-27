import walkRoutes from './utils/walkRoutes';
import pathnameAddon from './addons/pathname';
import ResponseCreator from './utils/createResponse';

function createConfig(history, routeArray, options = {}) {
  const {
    addons: addonFactories = [],
    sideEffects = [],
    cache = false
  } = options;

  // add the pathname addon to the provided addons
  const finalAddons = addonFactories.concat(pathnameAddon);
  let routes = [];
  const registeredAddons = {};
  const subscribers = [];

  let mostRecentKey;
  let previous = [];
  let responseInProgress;

  function setupRoutesAndAddons(routeArray) {
    const addonFunctions = [];
    // clear out any existing addons
    for (let key in registeredAddons) {
      delete registeredAddons[key];
    }

    finalAddons.forEach(addonFactory => {
      const addon = addonFactory();
      registeredAddons[addon.name] = addon.get;
      addonFunctions.push(addon);
    });

    routes = walkRoutes(routeArray, addonFunctions, {});
    makeResponse(history.location, history.action);
  };

  function matchRoute(rc) {
    routes.some(route => (route.match(history.location.pathname, rc)));
    // once we have matched the route, we freeze the responseCreator to
    // set its route/params/partials properties
    rc.freeze();
    return Promise.resolve(rc);
  };

  function loadRoute(rc) {
    if (!rc.route) {
      rc.setStatus(404);
      return Promise.resolve(rc);
    }

    const { preload, load } = rc.route;

    // just want to pass a subset of the ResponseCreator's methods
    // to the user
    const modifiers = load
      ? {
          fail: rc.fail.bind(rc),
          redirect: rc.redirect.bind(rc),
          setData: rc.setData.bind(rc),
          setStatus: rc.setStatus.bind(rc)
        }
      : undefined;

    return Promise.all([
      preload ? preload() : null,
      load ? load(rc.params, rc.location, modifiers) : null
    ])
      .catch(err => { rc.fail(err); })
      // ALWAYS return the response
      .then(() => rc);
  };

  function finalizeResponse(rc) {
    const respObject = rc.asObject();

    if (cache) {
      cache.set(respObject);
    }

    return respObject;
  };

  function prepareResponse(location) {
    // generate a random key when none is provided (old browsers, maybe unecessary?)
    const key = location.key || Math.random().toString(36).slice(2, 8);
    mostRecentKey = key;

    if (cache) {
      const cachedResponse = cache.get(location);
      if (cachedResponse != null) {
        return Promise.resolve(cachedResponse);
      }
    }

    const rc = new ResponseCreator(key, location);

    return matchRoute(rc)
      .then(loadRoute)
      .then(finalizeResponse);
  };

  function subscribe(fn) {
    if (typeof fn !== 'function') {
      throw new Error('The argument passed to subscribe must be a function');
    }

    // Immediately call subscriber function. If this is called before the
    // initial response has resolved, both params will be undefined. If called
    // after init resp has resolved, first param is the most recent response and
    // action is last history.action.
    fn.apply(null, previous);

    const newLength = subscribers.push(fn);
    return () => {
      subscribers[newLength - 1] = null;
    };
  };

  function emit(response, action) {
    // don't emit old responses
    if (response.key !== mostRecentKey) {
      return false;
    }

    sideEffects.forEach(fn => {
      fn(response, action);
    });

    subscribers.forEach(fn => {
      if (fn != null) {
        fn(response, action);
      }
    });

    return true;
  };

  // create a response object using the current location and
  // emit it to any subscribed functions
  function makeResponse(location, action) {
    responseInProgress = prepareResponse(location).then(response => {
      const emitted = emit(response, action);
      // only store these after we have emitted.
      if (emitted) {
        previous = [response, action];
      }
      return response;
    });
  };

  // now that everything is defined, actually do the setup
  setupRoutesAndAddons(routeArray);
  const unlisten = history.subscribe(makeResponse);

  return {
    ready: () => responseInProgress,
    refresh: setupRoutesAndAddons,
    subscribe,
    addons: registeredAddons,
    history
  };
}

export default createConfig;
