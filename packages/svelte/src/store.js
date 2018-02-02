import { Store } from "svelte/store";

function curiStore(router, store) {
  if (!store) {
    store = new Store({
      router,
      curi: router.current()
    });
  } else {
    store.set({
      router,
      curi: router.current()
    });
  }

  router.respond(
    ({ response, navigation }) => {
      store.set({ curi: { response, navigation } });
    },
    { observe: true }
  );

  return store;
}

export default curiStore;
