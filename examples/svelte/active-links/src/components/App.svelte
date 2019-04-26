<Router stores={stores}>
  <NavLinks />
  <svelte:component this={$response.response.body} />
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";
	import NavLinks from './NavLinks.svelte';

  export let stores;

  let response = stores.response;
</script>
