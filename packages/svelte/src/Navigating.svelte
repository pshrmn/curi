<svelte:component this={component} cancel={cancelCallback} />

<script>
  import { onMount, onDestroy } from "svelte";
  import { getRouter } from "@curi/svelte";

  let router = getRouter();

  let cancelCallback;
  let stop;
  let removed = false;

  export let component;

  $: navigating = cancelCallback !== undefined;

  onMount(() => {
    stop = router.cancel(fn => {
      if (!removed) {
        cancelCallback = fn;
      }
    });
  });

  onDestroy(() => {
    if(stop) {
      stop();
    }
  })
</script>
