<Router stores={stores}>
  <AsyncLink hash="is-a-band">Home</AsyncLink>
</Router>

<script>
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let stores;
</script>
