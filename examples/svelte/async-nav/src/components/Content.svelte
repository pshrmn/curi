{#if $response}
  <svelte:component this={$response.body} />
{:else}
  <div>loading...</div>
{/if}

<script>
  import { getResponse } from "@curi/svelte";

  let response = getResponse();
</script>