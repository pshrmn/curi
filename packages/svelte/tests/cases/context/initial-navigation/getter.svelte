<script>
  import { getNavigation } from "@curi/svelte";

  export let check;

  let navigation = getNavigation();

  check($navigation);
</script>