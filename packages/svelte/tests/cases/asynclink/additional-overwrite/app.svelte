<Router {router}>
  <AsyncLink name="Home" href="/oh-no">Home</AsyncLink>
</Router>

<script>
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let router;
</script>
