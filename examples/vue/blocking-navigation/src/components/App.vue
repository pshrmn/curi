<template>
  <div>
    <Nav />
    <component :is='$curi.response.body' />
  </div>
</template>

<script>
  import Nav from './Nav';
  export default {
    name: 'app',
    components: { Nav }
  };
</script>