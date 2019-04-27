<div>
  <button type="button" on:click={logoutAndRedirect}>
    Logout
  </button>
</div>

<script>
  import { getRouter } from "@curi/svelte";
  import fakeAuth from "../fakeAuth";

  const router = getRouter();

  function logoutAndRedirect() {
    fakeAuth.logout();
    router.navigate({ url: "/", method: "replace" });
  }
</script>
