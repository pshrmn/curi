<NavLink />
<svelte:component this={$response.body} />

<script>
  import { getResponse } from "@curi/svelte";
  import NavLink from './NavLinks.svelte';

  let response = getResponse();
</script>