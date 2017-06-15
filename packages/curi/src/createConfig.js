import walkRoutes from './utils/walkRoutes';
import pathnameAddon from './addons/pathname';
import ResponseCreator from './utils/createResponse';

function createConfig(history, routeArray, options = {}) {
  const {
    addons: addonFactories = [],
    middleware = [],
    cache = false
  } = options;

  // add the pathname addon to the provided addons
  const finalAddons = addonFactories.concat(pathnameAddon);
  let routes = [];
  const registeredAddons = {};
  const subscribers = [];

  let mostRecentKey;
  let previousResponse;
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
    makeResponse();
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

    return Promise.all([
      preload ? preload() : null,
      load ? load(rc.params, rc) : null
    ])
      .catch(err => { rc.fail(err); })
      // ALWAYS return the response
      .then(() => rc);
  };

  function finalizeResponse(rc) {
    const respObject = middleware.length
      ? middleware.reduce(
          (obj, curr) => curr(obj),
          rc.asObject()
        )
      : rc.asObject();

    if (cache) {
      cache.set(respObject);
    }

    previousResponse = respObject;
    return respObject;
  };

  function prepareResponse() {
    // generate a random key when none is provided (hash history)
    const key = history.location.key || Math.random().toString(36).slice(2, 8);
    mostRecentKey = key;

    if (cache) {
      const cachedResponse = cache.get(history.location);
      if (cachedResponse != null) {
        return Promise.resolve(cachedResponse);
      }
    }

    const rc = new ResponseCreator(key, history.location);

    return matchRoute(rc)
      .then(loadRoute)
      .then(finalizeResponse);
  };

  function subscribe(fn) {
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

  function emit(response) {
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

  // create a response object using the current location and
  // emit it to any subscribed functions
  function makeResponse() {
    responseInProgress = prepareResponse().then(response => {
      emit(response);
      return response;
    });
  };

  // now that everything is defined, actually do the setup
  setupRoutesAndAddons(routeArray);
  const unlisten = history.listen(makeResponse);

  return {
    ready: () => responseInProgress,
    refresh: setupRoutesAndAddons,
    subscribe,
    addons: registeredAddons,
    history
  };
}

export default createConfig;
