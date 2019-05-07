<template>
  <curi-link :name="to" :params="params" :class="classes">
    <slot></slot>
  </curi-link>
</template>

<script>
import { active as activeInteraction } from "@curi/router";

export default {
  name: "active-links",
  props: ["name", "params", "search", "hash", "state", "partial"],
  computed: {
    classes: function() {
      const route = this.$router.route(this.name);
      const active = activeInteraction(route, this.$curi.response, {
        params: this.params,
        partial: this.partial
      });
      return active ? "active" : "";
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
