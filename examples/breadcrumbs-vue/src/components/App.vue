<template>
  <div>
    <component
      :is="cmp"
      :data="$curi.response.data"
      :params="$curi.response.params"
    />
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