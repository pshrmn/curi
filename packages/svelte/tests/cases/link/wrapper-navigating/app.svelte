<Router stores={stores}>
  <Link name="Home" wrapper={Wrapper}>Home</Link>
</Router>

<script>
  import Link from "@curi/svelte/components/Link.svelte";
  import Router from "@curi/svelte/components/Router.svelte";
  import Wrapper from "./wrapper.svelte";

  export let stores;
</script>
