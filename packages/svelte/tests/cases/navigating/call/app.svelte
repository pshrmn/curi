<Router {router}>
  <Navigating component={ Cancel } />
</Router>

<script>
  import Navigating from "@curi/svelte/components/Navigating.svelte";
  import Router from "@curi/svelte/components/Router.svelte";
  import Cancel from "../../../fixtures/Cancel.svelte";

  export let router;
</script>
