<template>
  <div :style='{ background: color }'></div>
</template>

<script>
export default {
  name: "Preview",
  props: ["color"]
};
</script>

<style scoped>
div {
  width: 20px;
  height: 20px;
  background: #666;
}
</style>
