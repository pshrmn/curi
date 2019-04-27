<script>
  import { getRouter } from "@curi/svelte";

  export let check;

  const router = getRouter();

  check(router);
</script>