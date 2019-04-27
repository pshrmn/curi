<Router {router}>
  <Controls />
  <Navigating component={Cancel} />
  <Content />
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";
  import Navigating from "@curi/svelte/components/Navigating.svelte";

  import Controls from "./Controls.svelte";
  import Cancel from "./Cancel.svelte";
  import Content from "./Content.svelte";

  export let router;
</script>