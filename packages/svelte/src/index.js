import { readable } from "svelte/store";
import { getContext, setContext } from "svelte";

const routerKey = {};
const responseKey = {};
const navigationKey = {};

export function setup(router) {
  const initial = router.current();
  const response = readable(initial.response, set => {
    return router.observe(({ response }) => {
      set(response);
    });
  });
  const navigation = readable(initial.navigation, set => {
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
