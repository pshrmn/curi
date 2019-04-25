import { readable } from "svelte/store";
import { getContext, setContext } from "svelte";

export function curiStores(_router) {
  const router = readable(_router);
  const response = readable(_router.current(), set => {
    const stopObserving = _router.observe(({ response, navigation }) => {
      set({ response, navigation });
    });
    return stopObserving;
  });
  return { router, response };
}

const routerKey = {};
const responseKey = {};

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
