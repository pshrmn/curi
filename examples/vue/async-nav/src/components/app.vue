<template>
  <div id="app">
    <Controls />
    <component :is="$curi.response.body" :response="$curi.response"/>
  </div>
</template>

<script>
import Controls from "./Controls";

export default {
  components: {
    Controls
  }
};
</script>
