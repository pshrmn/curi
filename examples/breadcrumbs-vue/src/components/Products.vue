<template>
  <div>
    <h1>Products Page</h1>
    <h2>Categories</h2>
    <ul>
      <li v-for="category in data" :key="category">
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
    props: ['data'],
    methods: {
      title(category) {
        return this.$curi.config.addons.title('Category', { category });
      }
    }
  }
</script>
