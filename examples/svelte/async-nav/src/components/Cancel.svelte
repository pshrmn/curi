{#if typeof cancel === "function"}
  <button on:click={cancelHandler}>Cancel Navigation</button>
{/if}

<script>
  export let cancel;

  function cancelHandler(event) {
    event.preventDefault();
    cancel();
  }
</script>
