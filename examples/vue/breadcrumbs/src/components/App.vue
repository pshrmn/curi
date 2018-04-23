<template>
  <div>
    <component :is="this.$curi.response.body" />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
