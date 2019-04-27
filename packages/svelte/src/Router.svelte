<script>
  import { setRouter, setResponse, setNavigation } from "@curi/svelte";

  export let stores;

  setRouter(stores.router);
  setResponse(stores.response);
  setNavigation(stores.navigation);
</script>

<slot></slot>
