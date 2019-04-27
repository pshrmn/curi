<Router stores={stores}>
  <Root />
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";
	import Root from './Root.svelte';

  export let stores;
</script>
