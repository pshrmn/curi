<span>{navigating}</span>
<slot></slot>

<script>
  import { beforeUpdate } from "svelte";

  export let navigating;

  beforeUpdate(() => {
    console.warn("updating state");
  });
</script>
