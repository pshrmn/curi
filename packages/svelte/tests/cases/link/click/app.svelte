<Router {router}>
  <Link name="User" params={{ id: "1" }}>User 1</Link>
</Router>

<script>
  import Link from "@curi/svelte/components/Link.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  export let router;
</script>
