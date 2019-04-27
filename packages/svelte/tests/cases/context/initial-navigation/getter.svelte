<script>
  import { getNavigation } from "@curi/svelte";

  export let check;

  const navigation = getNavigation();

  check($navigation);
</script>