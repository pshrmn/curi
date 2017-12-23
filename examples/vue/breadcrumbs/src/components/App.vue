<template>
  <div>
    <component :is="cmp" />
  </div>
</template>

<script>
  import NotFound from './NotFound';
  export default {
    name: 'app',
    computed: {
      cmp() {
        return this.$curi.response.body || NotFound
      }
    }
  }
</script>