<Router {router}>
  <AsyncLink name="User" params={{ id: "1" }}>User 1</AsyncLink>
</Router>

<script>
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let router;
</script>
