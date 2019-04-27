import { readable } from "svelte/store";
import { getContext, setContext } from "svelte";

export function curiStores(_router) {
  const router = readable(_router);
  const initial = _router.current();
  const response = readable(initial.response, set => {
    return _router.observe(({ response }) => {
      set(response);
    });
  });
  const navigation = readable(initial.navigation, set => {
    return _router.observe(({ navigation }) => {
      set(navigation);
    });
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
