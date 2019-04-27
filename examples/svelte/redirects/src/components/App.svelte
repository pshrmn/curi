<Router {router}>
  <NavLinks />
  <Content />
</Router>

<script>
  import Router from '@curi/svelte/components/Router.svelte';
	import NavLinks from './NavLinks.svelte';
  import Content from "./Content.svelte";

  export let router;
</script>
