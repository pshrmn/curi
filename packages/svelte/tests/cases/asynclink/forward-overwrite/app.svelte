<Router stores={stores}>
  <AsyncLink name="Home" forward={{ href: "/oh-no" }}>Home</AsyncLink>
</Router>

<script>
  import AsyncLink from "../../../../src/AsyncLink.svelte";
  import Router from "../../../../src/Router.svelte";

  export let stores;
</script>
