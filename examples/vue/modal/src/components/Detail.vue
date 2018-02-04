<template>
  <div>
    <div
      class='thumbnail'
      :style='{ background: response.params.color || "#666" }'
    />
    <p>Previewing paint color {{response.params.color}}</p>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["response"]
};
</script>

<style>
.thumbnail {
  width: 80%;
  height: 25%;
  min-height: 200px;
  background: #666;
}
</style>
