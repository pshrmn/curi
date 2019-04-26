<Router stores={stores}>
  <Link name="Home" query="one=two" hash="test">Home</Link>
</Router>

<script>
  import Link from "@curi/svelte/components/Link.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let stores;
</script>
