<template>
  <div>Please do not contact us by {{params.method}}!</div>
</template>

<script>
  export default {
    name: 'contact-method',
    props: ['params']
  };
</script>
