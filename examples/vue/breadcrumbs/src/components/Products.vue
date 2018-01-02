<template>
  <div>
    <h1>Products Page</h1>
    <h2>Categories</h2>
    <ul>
      <li v-for="category in $curi.response.data" :key="category">
        <curi-link to="Category" :params="{ category }">
          {{title(category)}}
        </curi-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'products',
    methods: {
      title(category) {
        return this.$router.addons.title('Category', { category });
      }
    }
  }
</script>
