<Router stores={stores}>
  <AsyncLink name="Home" wrapper={Wrapper}>Home</AsyncLink>
</Router>

<script>
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import Router from "@curi/svelte/components/Router.svelte";
  import Wrapper from "./wrapper.svelte";

  export let stores;
</script>
