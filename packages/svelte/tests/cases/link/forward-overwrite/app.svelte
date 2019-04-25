<Router stores={stores}>
  <Link name="Home" forward={{ href: "/oh-no" }}>Home</Link>
</Router>

<script>
  import Link from "../../../../src/Link.svelte";
  import Router from "../../../../src/Router.svelte";

  export let stores;
</script>
