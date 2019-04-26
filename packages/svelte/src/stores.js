import { readable } from "svelte/store";
import { getContext, setContext } from "svelte";

export function curiStores(_router) {
  const router = readable(_router);
  const response = readable(_router.current(), set => {
    const stopObserving = _router.observe(({ response }) => {
      set(response);
    });
    return stopObserving;
  });
  const navigation = readable(_router.current(), set => {
    const stopObserving = _router.observe(({ navigation }) => {
      set(navigation);
    });
    return stopObserving;
  });
  return { router, response, navigation };
}

const routerKey = {};
const responseKey = {};
const navigationKey = {};

export function setRouter(store) {
  setContext(routerKey, store);
}
export function getRouter() {
  return getContext(routerKey);
}

export function setResponse(store) {
  setContext(responseKey, store);
}
export function getResponse() {
  return getContext(responseKey);
}

export function setNavigation(store) {
  setContext(navigationKey, store);
}
export function getNavigation() {
  return getContext(navigationKey);
}
