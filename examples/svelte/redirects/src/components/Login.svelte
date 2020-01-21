<div>
  <button type="button" on:click={loginAndRedirect}>
    Login
  </button>
</div>

<script>
  import { getRouter, getResponse } from "@curi/svelte";
  import fakeAuth from "../fakeAuth";

  let router = getRouter();
  let response = getResponse();

  function loginAndRedirect() {
    fakeAuth.login();
    let { query } = $response.location;
    router.navigate({ url: query.next || "/", method: "replace" });
  }
</script>
