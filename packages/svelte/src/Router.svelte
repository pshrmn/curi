<script>
  import { setRouter, setResponse } from "@curi/svelte";

  export let stores;

  setRouter(stores.router);
  setResponse(stores.response);
</script>

<slot></slot>
