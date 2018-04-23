<template>
  <div>
    <Nav />
    <component :is="this.$curi.response.body" />
  </div>
</template>

<script>
import NotFound from "./NotFound";
import Nav from "./Nav";
export default {
  name: "app",
  components: { Nav }
};
</script>
