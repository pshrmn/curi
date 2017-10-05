<template>
  <div>
    <component
      :is="cmp"
      :data="response.data"
      :params="response.params"
    />
  </div>
</template>

<script>
  import NotFound from './NotFound';
  export default {
    name: 'app',
    props: ['response'],
    computed: {
      cmp() {
        return this.response.body || NotFound
      }
    }
  }
</script>