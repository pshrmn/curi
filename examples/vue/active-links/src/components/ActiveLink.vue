<template>
  <curi-link
    :to="to"
    :params="params"
    :class="classes"
  >
    <slot></slot>
  </curi-link>
</template>

<script>
export default {
  name: "active-links",
  props: ["to", "params", "search", "hash", "state", "partial"],
  computed: {
    classes: function() {
      return this.$router.route.active(
        this.to,
        this.$curi.response,
        this.params,
        this.partial
      )
        ? "active"
        : "";
    }
  }
};
</script>

<style>
a {
  color: blue;
}

a.active {
  color: red;
}
</style>
