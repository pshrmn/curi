<Router stores={stores}>
  <Link name="User" params={{ id: "1" }}>User 1</Link>
</Router>

<script>
  import Link from "../../../../src/Link.svelte";
  import Router from "../../../../src/Router.svelte";

  export let stores;
</script>
