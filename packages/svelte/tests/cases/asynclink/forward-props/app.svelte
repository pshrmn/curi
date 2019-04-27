<Router {router}>
  <AsyncLink name="Home" forward={{ class: "test", target: "_blank" }}>Home</AsyncLink>
</Router>

<script>
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let router;
</script>
