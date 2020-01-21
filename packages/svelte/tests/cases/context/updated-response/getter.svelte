<script>
  import { getResponse } from "@curi/svelte";

  export let check;

  let response = getResponse();

  $: check($response);
</script>