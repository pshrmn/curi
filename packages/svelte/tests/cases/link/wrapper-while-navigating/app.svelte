<Router stores={stores}>
  <Link name="Test" wrapper={Wrapper}>Test</Link>
</Router>

<script>
  import Link from "../../../../src/Link.svelte";
  import Router from "../../../../src/Router.svelte";
  import Wrapper from "./wrapper.svelte";

  export let stores;
</script>
