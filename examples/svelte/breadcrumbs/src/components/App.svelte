<Router stores={stores}>
  <svelte:component this={$response.body} />
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";

  export let stores;

  const response = stores.response;
</script>