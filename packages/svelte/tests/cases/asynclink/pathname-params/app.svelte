<Router {router}>
  <AsyncLink
    name="User"
    params={{ id: "1" }}
    wrapper={Wrapper}
  >User 1</AsyncLink>
</Router>

<script>
  import AsyncLink from "@curi/svelte/components/AsyncLink.svelte";
  import Router from "@curi/svelte/components/Router.svelte";

  import Wrapper from "../../../fixtures/Wrapper.svelte";

  export let router;
</script>
