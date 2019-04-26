<Router stores={stores}>
  <Controls />
  <Navigating component={Cancel} />
  {#if $response}
    <svelte:component this={$response.body} />
  {:else}
    <div>loading...</div>
  {/if}
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";
  import Navigating from "@curi/svelte/components/Navigating.svelte";
  import Controls from "./Controls.svelte";
  import Cancel from "./Cancel.svelte";

  export let stores;

  const response = stores.response;
</script>