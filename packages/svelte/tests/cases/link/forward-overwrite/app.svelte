<Router stores={stores}>
  <Link name="Home" forward={{ href: "/oh-no" }}>Home</Link>
</Router>

<script>
  import Link from "@curi/svelte/components/Link.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let stores;
</script>
