<slot></slot>
{#if navigating}
  <Spinner />
{/if}

<script>
  import Spinner from "svelte-spinner";

  export let navigating;
</script>
