<button on:click={handleCancel}>
  {typeof cancel === "function" ? "Cancel" : "No op"}
</button>

<script>

  export let cancel;

  function handleCancel(event) {
    event.preventDefault();
    if (typeof cancel === "function") {
      cancel();
    }
  }
</script>