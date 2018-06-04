<template>
  <div>
    <Nav />
    <main v-curi-focus="$curi.response" tabIndex="-1">
      <component :is="$curi.response.body" />
    </main>
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
