<template>
  <div>
    <Nav />
    <component :is='response.body' />
  </div>
</template>

<script>
  import Nav from './Nav';
  export default {
    name: 'app',
    props: ['response'],
    components: { Nav }
  };
</script>