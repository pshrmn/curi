<div>
  <button type="button" on:click={loginAndRedirect}>
    Login
  </button>
</div>

<script>
  import { getRouter, getResponse } from "@curi/svelte";
  import fakeAuth from "../fakeAuth";

  const router = getRouter();
  const response = getResponse();

  function loginAndRedirect() {
    fakeAuth.login();
    const { query } = $response.response.location;
    $router.navigate({ url: query.next || "/", method: "replace" });
  }
</script>
