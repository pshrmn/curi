import { Store } from "svelte/store";

export default function curi_store(router, store) {
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

  router.observe(({ response, navigation }) => {
    store.set({ curi: { response, navigation } });
  });

  return store;
}
