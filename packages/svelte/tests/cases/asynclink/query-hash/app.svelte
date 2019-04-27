<Router {router}>
  <AsyncLink name="Home" query="one=two" hash="test">Home</AsyncLink>
</Router>

<script>
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let router;
</script>
