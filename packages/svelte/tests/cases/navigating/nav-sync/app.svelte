<Router stores={stores}>
  <Navigating component={ Cancel } />
</Router>

<script>
  import Navigating from "../../../../src/Navigating.svelte";
  import Router from "../../../../src/Router.svelte";
  import Cancel from "../../../fixtures/Cancel.svelte";

  export let stores;
</script>
