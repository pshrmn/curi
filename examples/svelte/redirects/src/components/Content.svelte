<svelte:component this={$response.body} />

<script>
  import { getResponse } from "@curi/svelte";

  const response = getResponse();
</script>
