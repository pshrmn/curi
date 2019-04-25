<Router stores={stores}>
  <Link name="Home" query="one=two" hash="test">Home</Link>
</Router>

<script>
  import Link from "../../../../src/Link.svelte";
  import Router from "../../../../src/Router.svelte";

  export let stores;
</script>
