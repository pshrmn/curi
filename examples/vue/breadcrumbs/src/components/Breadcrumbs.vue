<template>
  <ul class='breadcrumbs'>
    <li v-for="a in ancestors" :key="a">
      <curi-link :to="a" :params="params">{{title(a)}}</curi-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "breadcrumbs",
  props: ["name", "params"],
  computed: {
    ancestors() {
      return this.$router.route.ancestors(this.name).reverse();
    }
  },
  methods: {
    title(a) {
      return this.$router.route.title(a, this.params);
    }
  }
};
</script>
