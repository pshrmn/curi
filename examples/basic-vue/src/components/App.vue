<template>
  <div>
    <Nav />
    <component
      :is="cmp"
      :params="response.params"
    />
  </div>
</template>

<script>
  import NotFound from './NotFound';
  import Nav from './Nav';
  export default {
    name: 'app',
    props: ['response'],
    computed: {
      cmp() {
        return this.response.body || NotFound
      }
    },
    components: { Nav }
  }
</script>