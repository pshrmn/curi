<template>
  <div class="controls">
    <p>
      Use the controls to adjust the data load time and to clear the cache
      of loaded data.
    </p>
    <div>
      <label htmlFor="delay">Delay: {{this.delay}}</label>
      <input
        type="range"
        :value="this.delay"
        min="0"
        max="5000"
        step="500"
        v-on:change="this.delayHandler"
      />
    </div>
    <div>
      <button type="button" v-on:click="this.clearCache">
        Clear Cache
      </button>
    </div>
  </div>
</template>

<script>
import { delay } from "../api";
import cache from "../cache";

export default {
  data() {
    return {
      delay: delay()
    };
  },
  methods: {
    delayHandler(event) {
      const value = delay(parseInt(event.target.value, 10));
      this.delay = value;
    },
    clearCache() {
      cache.reset();
    }
  }
};
</script>

<style scoped>
.controls {
  border: 1px solid #444;
  padding: 5px;
}
</style>
