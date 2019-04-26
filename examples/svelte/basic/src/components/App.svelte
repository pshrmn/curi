<Router stores={stores}>
  <Nav />
  <svelte:component this={$response.body} />
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";
	import Nav from './Nav.svelte';

  export let stores;

  let response = stores.response;
</script>
