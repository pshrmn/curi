import { Store } from "svelte/store";

function curiStore(router, store) {
  if (!store) {
    store = new Store({
      router,
      curi: { response: undefined, navigation: undefined }
    });
  } else {
    store.set({
      router,
      curi: { response: undefined, navigation: undefined }
    });
  }

  router.respond(({ response, navigation }) => {
    store.set({ curi: { response, navigation } });
  });

  return store;
}

export default curiStore;
