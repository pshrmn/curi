<Router stores={stores}>
  <Link hash="is-a-band">Home</Link>
</Router>

<script>
  import Link from "../../../../src/Link.svelte";
  import Router from "../../../../src/Router.svelte";

  export let stores;
</script>
