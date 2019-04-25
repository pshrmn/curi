<Router stores={stores}>
  <AsyncLink name="Home" wrapper={Wrapper}>Home</AsyncLink>
</Router>

<script>
  import AsyncLink from "../../../../src/AsyncLink.svelte";
  import Router from "../../../../src/Router.svelte";
  import Wrapper from "./wrapper.svelte";

  export let stores;
</script>
