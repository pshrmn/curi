<template>
  <div>
    <NavLinks />
    <component :is="cmp" />
  </div>
</template>

<script>
  import NavLinks from './NavLinks';
  export default {
    name: 'app',
    computed: {
      cmp() {
        return this.$curi.response.body
      }
    },
    components: { NavLinks }
  }
</script>