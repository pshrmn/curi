<a {...$$restProps} href="{url}" on:click="{handleClick}">
  <svelte:component this="{wrapper}" navigating="{navigating}">
    <slot></slot>
  </svelte:component>
</a>

<script>
  import { onDestroy } from "svelte";
  import { getRouter } from "@curi/svelte";

  let router = getRouter();

  let canNavigate = (event, target) => {
    return (
      !event.defaultPrevented &&
      !target &&
      event.button === 0 &&
      !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
    );
  };

  export let name = undefined;
  export let params = {};
  export let hash = undefined;
  export let query = undefined;
  export let state = null;
  export let wrapper;

  let navigating = false;

  $: url = router.url({ name, params, hash, query });
  $: target = $$restProps.target;

  let cancelCallbacks;

  function handleClick(event) {
    if (canNavigate(event, target)) {
      event.preventDefault();
      let cancelled, finished;
      cancelled = finished = () => {
        cancelCallbacks = undefined;
        navigating = false;
      };
      navigating = true;

      cancelCallbacks = router.navigate({
        url,
        state,
        cancelled,
        finished,
      });
    }
  }

  onDestroy(() => {
    if (cancelCallbacks) {
      cancelCallbacks();
    }
  });
</script>
