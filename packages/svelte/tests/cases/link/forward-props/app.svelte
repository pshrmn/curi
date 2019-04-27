<Router {router}>
  <Link name="Home" forward={{ class: "test", target: "_blank" }}>Home</Link>
</Router>

<script>
  import Link from "@curi/svelte/components/Link.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let router;
</script>
