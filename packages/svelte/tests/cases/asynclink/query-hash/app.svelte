<Router stores={stores}>
  <AsyncLink name="Home" query="one=two" hash="test">Home</AsyncLink>
</Router>

<script>
  import AsyncLink from "../../../../src/AsyncLink.svelte";
  import Router from "../../../../src/Router.svelte";

  export let stores;
</script>
