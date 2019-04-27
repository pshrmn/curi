<Router {router}>
  <AsyncLink name="Test" wrapper={Wrapper}>Test</AsyncLink>
</Router>

<script>
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import Router from "@curi/svelte/components/Router.svelte";
  import Wrapper from "./wrapper.svelte";

  export let router;
</script>
