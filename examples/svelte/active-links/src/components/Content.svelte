<svelte:component this={$response.body} />

<script>
  import { getResponse } from "@curi/svelte";

  let response = getResponse();
</script>