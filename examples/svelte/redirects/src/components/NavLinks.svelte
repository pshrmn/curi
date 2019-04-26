<nav>
  <ul>
    <li>
      <Link name="Home">Home</Link>
    </li>
    <li>
      <Link name="Protected">Protected</Link>
    </li>
    <li>
      {#if authenticated}
        <Link name="Logout">Logout</Link>
      {:else}
        <Link name="Login">Login</Link>
      {/if}
    </li>
  </ul>
</nav>

<script>
  import Link from "@curi/svelte/components/Link.svelte";
  import fakeAuth from "../fakeAuth";

  $: authenticated = $fakeAuth;
</script>
