<Router {router}>
  <Getter {check}/>
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";
  import Getter from "./getter.svelte";

  export let router;
  export let check;
</script>
