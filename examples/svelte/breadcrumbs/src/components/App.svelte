<Router stores={stores}>
  <Content />
</Router>

<script>
  import Router from "@curi/svelte/components/Router.svelte";
  import Content from "./Content.svelte";

  export let stores;
</script>