<script>
  import { getResponse } from "@curi/svelte";

  export let check;

  const response = getResponse();

  $: check($response);
</script>