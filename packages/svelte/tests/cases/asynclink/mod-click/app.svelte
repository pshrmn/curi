<Router stores={stores}>
  <AsyncLink name="User" params={{ id: "1" }}>User 1</AsyncLink>
</Router>

<script>
  import AsyncLink from "../../../../src/AsyncLink.svelte";
  import Router from "../../../../src/Router.svelte";

  export let stores;
</script>
