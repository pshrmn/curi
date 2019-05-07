<template>
  <div>
    <h1>Products Page</h1>
    <h2>Categories</h2>
    <ul>
      <li v-for="category in $curi.response.data" :key="category">
        <curi-link name="Category" :params="{ category }">
          {{ title(category) }}
        </curi-link>
      </li>
    </ul>
  </div>
</template>

<script>
import title from "../titleInteraction";

export default {
  name: "products",
  methods: {
    title(category) {
      const categoryRoute = this.$router.route("Category");
      return title(categoryRoute, { category });
    }
  }
};
</script>
