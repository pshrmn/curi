<a {...rest} href={url} on:click={handleClick}>
  <slot></slot>
</a>

<script>
  import { getContext } from "svelte";
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

  let {
    name: _name,
    params: _params,
    hash: _hash,
    query: _query,
    state: _state,
    wrapped: _wrapper,
    '$$slots': _slots,
    '$$scope': _scope,
    ...rest
  } = $$props;

  $: url = router.url({ name, params, hash, query });
  $: target = rest.target;

  function handleClick(event) {
    if (canNavigate(event, target)) {
      event.preventDefault();
      router.navigate({ url, state });
    }
  }
</script>
