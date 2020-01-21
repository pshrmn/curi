<script>
  import { getRouter } from "@curi/svelte";

  export let check;

  let router = getRouter();

  check(router);
</script>