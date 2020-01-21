import { readable } from "svelte/store";
import { getContext, setContext } from "svelte";

let routerKey = {};
let responseKey = {};
let navigationKey = {};

export function setup(router) {
  let initial = router.current();
  let response = readable(initial.response, set => {
    return router.observe(({ response }) => {
      set(response);
    });
  });
  let navigation = readable(initial.navigation, set => {
    return router.observe(({ navigation }) => {
      set(navigation);
    });
  });

  setContext(routerKey, router);
  setContext(responseKey, response);
  setContext(navigationKey, navigation);
}

export function getRouter() {
  return getContext(routerKey);
}
export function getResponse() {
  return getContext(responseKey);
}
export function getNavigation() {
  return getContext(navigationKey);
}
