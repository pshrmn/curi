<template>
  <div>
    <Nav />
    <component
      :is="cmp"
      :params="$curi.response.params"
    />
  </div>
</template>

<script>
  import NotFound from './NotFound';
  import Nav from './Nav';
  export default {
    name: 'app',
    computed: {
      cmp() {
        return this.$curi.response.body || NotFound
      }
    },
    components: { Nav }
  }
</script>