<div class="controls">
  <p>
    Use the controls to adjust the data load time and to clear the cache
    of loaded data.
  </p>
  <div>
    <label for="delayRange">Delay: {delay}</label>
    <input
      type="range"
      id="delayRange"
      bind:value={delay}
      min="0"
      max="5000"
      step="500"
      on:input={delayHandler}
    />
  </div>
  <div>
    <button type="button" on:click={clearCache}>
      Clear Cache
    </button>
  </div>
</div>

<script>
  import { delay as delayAPI } from "../api";
  import cache from "../cache";

  let delay = delayAPI();

  function delayHandler(event) {
    delayAPI(parseInt(event.target.value, 10));
  }

  function clearCache() {
    cache.reset();
  }
</script>

<style>
  .controls {
    border: 1px solid #444;
    padding: 5px;
  }
</style>