<Router stores={stores}>
  <Link name="Home" forward={{ class: "test", target: "_blank" }}>Home</Link>
</Router>

<script>
  import Link from "../../../../src/Link.svelte";
  import Router from "../../../../src/Router.svelte";

  export let stores;
</script>
